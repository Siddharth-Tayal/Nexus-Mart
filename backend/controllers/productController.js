const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary")
// USER ROUTES
// All Products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
    let products = await apiFeature.query;
    let filteredProductsCount = products.length;
    const apifeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    products = await apifeatures.query;
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
    })
}
);

// Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandler("Product not found", 404))

    res.status(200).json({
        success: true,
        product
    })
});

// UPDATE PRODUCT --Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler("Product has been removed from the store", 404))

    // cloudinary starts
    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images;
    }

    //deleting old images
    if (images !== undefined) {
        for (let index = 0; index < product.images.length; index++) {
            await cloudinary.v2.uploader.destroy(product.images[index].public_id)
        } //adding new images
        const imagesLink = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
                width: 300,
                crop: "scale"
            })
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLink;

    }


    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })
}
);

// Create and Update Reviews
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating), comment
    };
    const product = await Product.findById(productId);
    const isReviewed = await product.reviews.find(rev => rev.user.toString() === req.user._id.toString());
    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                (rev.rating = rating), (rev.comment = comment)
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    const sum = product.reviews.forEach(rev => {
        avg += rev.rating
    });

    avg = avg / product.reviews.length;
    product.ratings = avg;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        message: "Review added"
    })
})

// Get all Reviews
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) return next(new ErrorHandler("Product not found", 404))

    res.status(200).json({
        success: true,
        review: product.reviews
    })
})

// Delete Reviews
exports.deleteReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) return next(new ErrorHandler("Product not found", 404));
    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());
    let avg = 0;
    reviews.forEach(rev => {
        avg += rev.rating
    });
    let ratings;
    if (product.reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / product.reviews.length;
    }
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
    })
})


// ADMIN ROUTES
// Create Products
exports.createProduct = catchAsyncError(async (req, res, next) => {
    try {
        let images = [];
        if (typeof req.body.images === "string") {
            images.push(req.body.images)
        } else {
            images = req.body.images;
        }
        const imagesLink = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
                width: 300,
                crop: "scale"
            })
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLink;
        req.body.user = req.user.id;

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product,
        });
    } catch (error) {
        next(error);
    }
});


// Get All Products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products,
    })
}
);

// Delete Products
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler("Product not found", 404))
    //deleteing images from cloudinary
    for (let index = 0; index < product.images.length; index++) {
        await cloudinary.v2.uploader.destroy(product.images[index].public_id)
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
});
