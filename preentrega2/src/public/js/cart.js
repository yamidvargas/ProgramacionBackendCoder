"use strict";
//Eliminando productos desde front
const deleteBtns = document.querySelectorAll("#cart__product--deleteBtn");
const clearCart = document.querySelectorAll("#clearCar");
const deleteProduct = async (cid, pid) => {
    try {
        const response = await fetch(`/api/carts/${cid}/product/${pid}`, {
            method: "DELETE",
        });
        const result = await response.json();
        if (result.status === "succes") {
            alert("Producto eliminado correctamente");
        }
    }
    catch (error) {
        console.log(error);
    }
};
const deleteCart = async (cid) => {
    try {
        const response = await fetch(`/api/carts/${cid}`, {
            method: "DELETE",
        });
        const result = await response.json();
        if (result.status === "succes") {
            alert("carrito de comprar eliminado");
        }
    }
    catch (error) {
        console.log(error);
    }
};
deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const pid = btn.value;
        deleteProduct("63d7cbab305dba7349d8ea89", pid);
        location.reload();
    });
});
clearCart.forEach((bton) => {
    bton.addEventListener("click", () => {
        deleteCart("63d7cbab305dba7349d8ea89");
        location.reload();
    });
});
