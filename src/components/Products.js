import React, { useEffect, useContext, useState, useRef } from 'react';
import Spinner from '../container/Spinner';
import Product from './Product';
import productContext from '../context/products/productContext';
import AddProducts from './AddProducts';

const Products = (props) => {
    const context = useContext(productContext);
    const { products, getAllProducts, editProduct,loading } = context;


    useEffect(() => {
        getAllProducts();

        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [product, setProduct] = useState({ id: "", etitle: "", edescription: "", etag: "", eprice: 0 });

    const updateProduct = (currentProduct) => {
        ref.current.click();
        setProduct({ id: currentProduct._id, etitle: currentProduct.title, edescription: currentProduct.description, etag: currentProduct.tag, eprice: currentProduct.price })
    }
    const handleClick = () => {
        console.log("Updating the Product...", product);
        editProduct(product.id, product.etitle, product.edescription, product.etag, product.eprice);
        refClose.current.click();
        
        props.showAlert("Updated successfully", "success")
    }

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }


    return (
        <div className="container my-2">
            <AddProducts showAlert = {props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={product.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={product.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={product.etag} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Price</label>
                                    <input type="text" className="form-control" id="eprice" name="eprice" value={product.eprice} onChange={onChange} minLength={5} required />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={product.etitle.length < 5 || product.edescription.length < 5 || product.etag.length < 3 || product.eprice.length < 1} onClick={handleClick} type="button" className="btn btn-primary">Update Product</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Products</h2>
                {loading && <Spinner />}
                <div className="container">
                    {products.length === 0 && "No products to display"}
                </div>
                {!loading && products.map((product) => {
                    return <div className="col-md-4" key={product._id} >
                        <Product product={product} updateProduct={updateProduct} showAlert ={props.showAlert} />
                    </div>
                })}
            </div>
        </div>
    )
}


export default Products;
