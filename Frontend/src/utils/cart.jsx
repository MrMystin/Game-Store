import Swal from "sweetalert2";

export function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function addToCart(game) {
  const cart = getCart();

  const alreadyInCart = cart.find(item => item.productId === game.id);
  if (!alreadyInCart) {
    const cartItem = {
      productId: game.id,
      productName: game.name,
      publisherName: game.publisher.name,
      productValue: Number(game.value),
      discount: Number(game.discount) || 0,
      finalPrice: Number(game.value) - (Number(game.discount) || 0),
      banner: game.photos?.find(p => p.type === "banner")?.photo || "",
    };

    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
      icon: "success",
      title: "Adicionado ao carrinho!",
      showConfirmButton: false,
      timer: 1200,
    });
  } else {
    Swal.fire({
      icon: "info",
      title: "Produto já está no carrinho!",
      showConfirmButton: false,
      timer: 1200,
    });
  }
}
