import ScreenNotFound from "../shared/ui/screens/ScreenNotFound"
import { Bottombar } from "../shared/ui/molecules/bottombar/Bottombar"
import { NavbarNotFound } from "@/src/shared/ui/organisms/navbar/NavbarNotFound"

export default function NotFound() {
    return (
        <>
            <NavbarNotFound />
            <ScreenNotFound />
            <Bottombar />
        </>
    )
}