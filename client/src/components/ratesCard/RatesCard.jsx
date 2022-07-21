import "./ratesCard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBowlFood } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import ImageSlider from "../imageSlider/ImageSlider";

export default function RatesCard(props) {

    const hasBreakfast = props.roomAdditionalInfo.breakfastInfo == "hotel_detail_breakfast_included"
    // const hasSupplier = props.market_rates.supplier


    return (
        <div className="ratesCard">
             <div className="rates--container">
                <div className="rates--pricing"> 
                    <div className="rates--details">
                        {hasBreakfast && 
                            <div className="free-breakfast">
                            <FontAwesomeIcon className="food-icon" icon={faBowlFood}/>
                                Free Breakfast Included
                            </div>}
                    </div>
                    <span className="price">S${(props.price).toFixed(2)}</span>
                    <span className="room">/ night (w taxes & fees)</span>
                    <h2 className="website">Expedia</h2>
                </div>
            </div>
        </div>
    )
}
