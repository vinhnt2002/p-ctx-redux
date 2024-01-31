import { useShoppingContext } from "@/contexts/ShoppingContext";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/common";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  increaseQty,
  addCartItem,
  decreaseQty,
  removeCartItem,
  selectAllProducts,
} from "@/redux/slices/cartSlices";

const CartItem = () => {
  const cartItem = useSelector(selectAllProducts);

  const dispatch = useDispatch();
  return (
    <div className="flex flex-col space-y-4">
      {cartItem.map((item) => (
        <div className="flex justify-between items-center" key={item.id}>
          <div className="flex space-x-2">
            <Image
              src={item.thumbnail}
              alt="image"
              width={60}
              height={60}
              className="rounded-md"
            />
            <div className="flex flex-col items-center">
              <p>{item.name}</p>
              <p>{formatCurrency(item.price)}</p>
            </div>
          </div>
          {item.qty}
          <div className="flex items-center space-x-2">
            <Plus
              className="h-4 w-4"
              onClick={() => dispatch(increaseQty(item.id))}
            />
            <Minus
              className="h-4 w-4"
              onClick={() => dispatch(decreaseQty(item.id))}
            />
          </div>

          <Button
            variant="destructive"
            size={"icon"}
            onClick={() => dispatch(removeCartItem(item.id))}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
