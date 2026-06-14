"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./billing.css";

interface Product {
  name: string;
  qty: number;
  price: number;
}

export default function BillingPage() {
  const [customerName, setCustomerName] =
    useState("");

  const [mobile, setMobile] =
    useState("");
  
  const [upiId, setUpiId] =
  useState("techkart@paytm");

  const [paymentMode, setPaymentMode] =
    useState("Cash");

  const [products, setProducts] =
    useState<Product[]>([
      {
        name: "",
        qty: 1,
        price: 0,
      },
    ]);

  const invoiceNo =
    "INV-" +
    Date.now()
      .toString()
      .slice(-6);

  const addProduct = () => {
    setProducts([
      ...products,
      {
        name: "",
        qty: 1,
        price: 0,
      },
    ]);
  };

  const removeProduct = (
    index: number
  ) => {
    const updated =
      products.filter(
        (_, i) => i !== index
      );

    setProducts(updated);
  };

  const updateProduct = (
    index: number,
    field: keyof Product,
    value: any
  ) => {
    const updated = [...products];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setProducts(updated);
  };

  const grandTotal =
    products.reduce(
      (sum, item) =>
        sum +
        item.qty * item.price,
      0
    );

  const taxableAmount =
    grandTotal / 1.18;

  const cgst =
    taxableAmount * 0.09;

  const sgst =
    taxableAmount * 0.09;

    const upiPaymentLink =
  `upi://pay?pa=${upiId}&pn=TechKart Electronics&am=${grandTotal.toFixed(
    2
  )}&cu=INR`;

  const printBill = () => {
    window.print();
  };

  const shareWhatsapp = () => {
    const message = `
Invoice : ${invoiceNo}

Customer : ${customerName}

Mobile : ${mobile}

Total Amount : ₹${grandTotal.toFixed(
      2
    )}

Thank you for shopping with us.
`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  return (
    <div className="billing-page">

      <div className="billing-left">

        <div className="billing-card">

          <h2>
            POS Billing Software
          </h2>

          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) =>
              setMobile(
                e.target.value
              )
            }
          />

          <select
            value={paymentMode}
            onChange={(e) =>
              setPaymentMode(
                e.target.value
              )
            }
          >
            <option>
              Cash
            </option>
            <option>
              UPI
            </option>
            <option>
              Card
            </option>
            <option>
              Net Banking
            </option>
          </select>

          <h3>
            Products
          </h3>

          {products.map(
            (product, index) => (
              <div
                className="product-row"
                key={index}
              >
                <input
                  type="text"
                  placeholder="Product Name"
                  value={
                    product.name
                  }
                  onChange={(e) =>
                    updateProduct(
                      index,
                      "name",
                      e.target
                        .value
                    )
                  }
                />

                <input
                  type="number"
                  placeholder="Qty"
                  value={
                    product.qty
                  }
                  onChange={(e) =>
                    updateProduct(
                      index,
                      "qty",
                      Number(
                        e.target
                          .value
                      )
                    )
                  }
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={
                    product.price
                  }
                  onChange={(e) =>
                    updateProduct(
                      index,
                      "price",
                      Number(
                        e.target
                          .value
                      )
                    )
                  }
                />

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeProduct(
                      index
                    )
                  }
                >
                  ✕
                </button>
              </div>
            )
          )}

          <button
            className="add-btn"
            onClick={
              addProduct
            }
          >
            + Add Product
          </button>

          <div className="summary-box">

            <p>
              Taxable Value :
              ₹
              {taxableAmount.toFixed(
                2
              )}
            </p>

            <p>
              CGST (9%) :
              ₹
              {cgst.toFixed(
                2
              )}
            </p>

            <p>
              SGST (9%) :
              ₹
              {sgst.toFixed(
                2
              )}
            </p>

            <h2>
              Total :
              ₹
              {grandTotal.toFixed(
                2
              )}
            </h2>

          </div>

          <div className="actions">

            <button
              className="print-btn"
              onClick={
                printBill
              }
            >
              Print Bill
            </button>

            <button
              className="whatsapp-btn"
              onClick={
                shareWhatsapp
              }
            >
              WhatsApp
            </button>

          </div>

        </div>

      </div>

      <div className="billing-right">

        <div className="invoice-paper">

          <div className="invoice-header">

            <h1>
              TAX INVOICE
            </h1>

            <h2>
              TECHKART
              ELECTRONICS
            </h2>

            <p>
              GSTIN :
              10ABCDE1234F1Z5
            </p>

            <p>
              Mobile :
              8294935408
            </p>

          </div>

          <div className="invoice-info">

            <div>
              <strong>
                Invoice No:
              </strong>{" "}
              {invoiceNo}
            </div>

            <div>
              <strong>
                Date:
              </strong>{" "}
              {new Date().toLocaleDateString()}
            </div>

          </div>

          <div className="customer-section">

            <p>
              <strong>
                Customer:
              </strong>{" "}
              {customerName}
            </p>

            <p>
              <strong>
                Mobile:
              </strong>{" "}
              {mobile}
            </p>

          </div>

          <table className="invoice-table">

            <thead>
              <tr>
                <th>
                  Product
                </th>
                <th>
                  Qty
                </th>
                <th>
                  Rate
                </th>
                <th>
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>

              {products.map(
                (
                  product,
                  index
                ) => (
                  <tr
                    key={
                      index
                    }
                  >
                    <td>
                      {
                        product.name
                      }
                    </td>

                    <td>
                      {
                        product.qty
                      }
                    </td>

                    <td>
                      ₹
                      {
                        product.price
                      }
                    </td>

                    <td>
                      ₹
                      {(
                        product.qty *
                        product.price
                      ).toFixed(
                        2
                      )}
                    </td>
                  </tr>
                )
              )}

            </tbody>

          </table>

          <div className="invoice-total">

            <p>
              Taxable :
              ₹
              {taxableAmount.toFixed(
                2
              )}
            </p>

            <p>
              CGST :
              ₹
              {cgst.toFixed(
                2
              )}
            </p>

            <p>
              SGST :
              ₹
              {sgst.toFixed(
                2
              )}
            </p>

            <h2>
              Grand Total :
              ₹
              {grandTotal.toFixed(
                2
              )}
            </h2>

          </div>

          <div className="invoice-footer">

            <p>
              Payment :
              {paymentMode}
            </p>

            <p>
              Thank You For
              Shopping
            </p>

            <p>
              Authorized
              Signature
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}