import Image from "next/image";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import { formatCurrency } from "@/helpers/common";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  thumbnail,
  id,
}) => {
  const { addCartItem } = useShoppingContext();
  
  const handleAddToCart = () => {
    const product = { id, name, price, thumbnail };
    addCartItem(product);
  };

  return (
    <div className="">
      <Card className="w-[250px] rounded-md ">
        <CardHeader className="w-full h-52 relative">
          <Image src={thumbnail} alt="img" fill />
        </CardHeader>
        <CardContent>
          <div className="">
            <h2 className="font-semibold text-2xl">{name}</h2>
            <p>{formatCurrency(price)}</p>

            <Button
              size={"sm"}
              variant={"default"}
              className="mt-2"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
