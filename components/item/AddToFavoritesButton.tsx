'use client'

import { Button } from "@nextui-org/react"
import { Heart } from "lucide-react"

const AddToFavoritesButton = () => {
    return (
        <Button isIconOnly variant="flat" >
            <Heart />
        </Button>
    )
}

export default AddToFavoritesButton