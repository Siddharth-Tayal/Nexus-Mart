import { Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import { AccountBalance, LibraryAddCheck, LocalShipping } from '@material-ui/icons'
import React, { Fragment } from 'react'
import "./CheckoutSteps.css"
const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShipping />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheck />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalance />
        }
    ]
    const stepStyle = {
        boxSizing: "Border-box"
    }
    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={0} style={stepStyle} >
                {
                    steps.map((item, index) =>
                    (
                        <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false} >
                            <StepLabel icon={item.icon}
                                style={
                                    {
                                        color: activeStep >= index ? 'tomato' : "rgba(0,0,0,0.65)"
                                    }
                                }>
                                {item.label}
                            </StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
        </Fragment >
    )
}

export default CheckoutSteps