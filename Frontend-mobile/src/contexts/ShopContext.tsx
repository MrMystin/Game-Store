import React, { createContext, useContext, useState } from "react";

type ShopContextType = {
    cartItems: any[];
    addToCart: (item: any) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
    clearCart: () => Promise<void>;
};

export const ShopContext = createContext<ShopContextType>({} as ShopContextType);

export const ShopProvider: React.FC<{ children: React.ReactNode}> = ({ children}) => {
    const [cartItems, setCartItems] = useState<any[]>([]);

    const addToCart = async (item: any, quantity: number = 1) => {
        setCartItems(prevItems => {
                const existingIndex = prevItems.findIndex(
                    cartItem => cartItem.id === item.id
                );
                if (existingIndex >= 0) {
                    const updatedItems = [...prevItems];
                    if (updatedItems[existingIndex].quantity + quantity > 0) {
                        updatedItems[existingIndex].quantity += quantity;
                    }
                    return updatedItems;
                }
                else {
                    return [...prevItems, {...item, quantity}];
                }

            }
        )
    }

    const removeFromCart = async (itemId: number): Promise<void> => {
        setCartItems((prevItems) =>  
            prevItems.filter(item => item.id !== itemId)
        );
    }

    const clearCart = async (): Promise<void> => {
        setCartItems([]);
    };

    return (
        <ShopContext
            value={ { cartItems, addToCart, removeFromCart, clearCart } }
        >
            {children}
        </ShopContext>
    );
}

export const useShop = () => useContext(ShopContext);

