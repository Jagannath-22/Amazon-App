import React from 'react';
import './ProductPage.css';

function ProductDetails({ product }) {
    if (!product.productDetails) return null;
    return (
        <div className="productPage__productDetails">
            <h3>Product details</h3>
            <table>
                <tbody>
                    {Object.entries(product.productDetails).map(([key, value]) => (
                        <tr key={key}>
                            <td className="detail-key">{key}</td>
                            <td className="detail-value">{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ProductDetails;