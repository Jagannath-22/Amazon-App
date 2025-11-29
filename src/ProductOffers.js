import React from 'react';
import './ProductPage.css';


function ProductOffers() {
    return (
        <div className="productPage__offers">
            <h3>Offers</h3>
            <div className="productPage__offerGrid">
                <div className="productPage__offerItem">
                    <div className="offer-title">Cashback</div>
                    <div className="offer-desc">Upto ₹75.00 cashback on select Debit Cards.</div>
                </div>
                <div className="productPage__offerItem">
                    <div className="offer-title">Bank Offer</div>
                    <div className="offer-desc">Upto ₹150.00 discount on select Credit Cards.</div>
                </div>
                <div className="productPage__offerItem">
                    <div className="offer-title">No Cost EMI</div>
                    <div className="offer-desc">Upto ₹150.00 EMI available on select cards.</div>
                </div>
            </div>
            <hr className="productPage__divider" />
        </div>
    );
}
export default ProductOffers;