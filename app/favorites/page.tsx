import FavoritesList from "@/components/favorites/FavoritesList";
import { Suspense } from "react";

const Page = () => {
    return (
        <div>
           <h1 className="text-2xl font-bold">Избранное</h1>

           <div>
            <Suspense fallback={<div>Loading...</div>}>
                <FavoritesList />
            </Suspense>
           </div>
        </div>
    )
}

export default Page;