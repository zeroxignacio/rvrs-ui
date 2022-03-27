import { DefaultTheme } from "styled-components";
import { CardProps } from "./types";
interface StyledCardProps extends CardProps {
    theme: DefaultTheme;
    isOwned?: boolean;
    nftImg: string;
    nftTitle: string;
    nftId: number;
    nftBnbPrice: string;
    nftUsdPrice: string;
}
declare const StyledCard: import("styled-components").StyledComponent<"div", DefaultTheme, StyledCardProps, never>;
export default StyledCard;
