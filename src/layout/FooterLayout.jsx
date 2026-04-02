import { Box } from "../ui/containers/containers";
import { Footer } from "../ui/footer/footer";
import { GitTag } from "../ui/tag/tag";

export function FooterLayout() {

    return (
        <Box styles={{
            display: "flex",
            flexDirection: "row"
        }}>
            <GitTag />
            <Footer />
        </Box>
    )

}