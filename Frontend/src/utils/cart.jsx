import Swal from "sweetalert2";

export function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function isInCart(productId) {
  const cart = getCart();
  return cart.some(item => item.productId === productId);
}

export function addOrRemoveFromCart(game) {
  const token = localStorage.getItem("token");

  if (!token) {
    Swal.fire({
      icon: "info",
      title: "Você precisa estar logado para usar o carrinho.",
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);

    return false;
  }

  const cart = getCart();
  const index = cart.findIndex(item => item.productId === game.id);

  if (index !== -1) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
      icon: "warning",
      title: "Removido do carrinho!",
      showConfirmButton: false,
      timer: 1200,
    });

    return false;
  } else {
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

    return true;
  }
}
