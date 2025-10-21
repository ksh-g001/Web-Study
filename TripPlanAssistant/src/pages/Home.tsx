import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import ny from "@/assets/newyork.jpg"
import hoian from "@/assets/hoian.jpg"
import sydney from "@/assets/sydney.jpg"
import taj from "@/assets/tajimahal.jpg"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";


export default function Home() {
    const [count, setCount] = useState(0)
    const images = [ny, hoian, sydney, taj]
    const [api, setApi] = useState<CarouselApi | null>(null)

    useEffect(() => {
        if (!api) return
        const onSelect = () => setCount(api.selectedScrollSnap())
        onSelect()
        api.on("select", onSelect)
        return () => { api.off("select", onSelect) }
    }, [api])

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <Carousel
                        opts={{ align: "start", loop: true }}
                        setApi={setApi}
                        plugins={[
                            Autoplay({
                                delay: 3000
                            })
                        ]}
                        className="w-full">
                        <CarouselContent>
                            {images.map((src, idx) => (
                                <CarouselItem key={idx}>
                                    <img
                                        src={src}
                                        alt={`Home Image ${idx}`}
                                        className="w-full h-auto object-fill rounded-md"></img>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    <div className="flex justify-center space-x-2 mt-2">
                        {images.map((_, index) => (
                            <Button
                                key={index}
                                variant={count === index ? "default" : "outline"}
                                size="sm"
                                className="w-2 h-2 p-0 rounded-full"
                                onClick={() => setCount(index)}
                            />
                        ))}
                    </div>
                    <CardTitle className="mt-4">여행 계획도 편하게</CardTitle>
                    <CardDescription>여러 창을 켜서 작성하던 여행 계획을 한 창에서 해결하세요</CardDescription>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </div>
    )
}