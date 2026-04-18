import { AppErrors } from "../ui/appErrors/AppErrors";
import { Box } from "../ui/containers/containers";
import { Footer } from "../ui/footer/footer";
import { GitTag } from "../ui/tag/tag";

export function FooterLayout() {

    return (
        <Box styles={{
            display: "flex",
            flexDirection: "row",
            background: "#1e2326",
            zIndex: 10
        }}>
            <AppErrors />
            <GitTag />
            <Footer />
        </Box>
    )

}