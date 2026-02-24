import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"



export default function ProductCard({product} :{product : any}) { 

return ( 
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video " />
        {product?.mainImage?.length > 0 ? (
            

            <div className="w-full aspect-square  flex items-center justify-center overflow-hidden rounded">
                <img
                className="w-full h-full object-contain"
                src={"http://localhost:8000/public" + product.mainImage?.[0]?.['480']}
                alt={` ${product.title}`}
                />
            </div>
            
          ) : (
              <p>تصویری موجود نیست</p>
          )
        }
        <CardHeader>
            <CardAction>
            </CardAction>
            <CardTitle className="mt-4 line-clamp-2 text-sm md:text-xs lg:text-sm sm:text-[8px] text-right font-bold text-gray-700">{product.title}</CardTitle>
            <CardDescription>
                <span className="mt-2 text-sm text-[#F15A22] font-bold'">{product.price}</span>
            </CardDescription>
        </CardHeader>
        <CardFooter>
            <Button className="w-full bg-[#F15A22]"><ShoppingCartIcon /></Button>
        </CardFooter>
    </Card>
)
}