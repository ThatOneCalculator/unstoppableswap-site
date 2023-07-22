import { Box, makeStyles, Typography } from "@material-ui/core";
import AnonymousIcon from "../icons/AnonymousIcon";
import GitHubIcon from "@material-ui/icons/GitHub";
import DecentralizedIcon from "../icons/DecentralizedIcon";
import CryptographyIcon from "../icons/CryptographyIcon";

const useStyles = makeStyles((theme) => ({
  outer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    "& > *": {
      textAlign: "center",
    },
    width: "100%",
    gap: theme.spacing(2),
  },
  featureItemOuter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(2),
    maxWidth: "400px",
  },
}));

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) {
  const classes = useStyles();
  // All centered
  // Icon at top
  // Title in the middle
  // Description at the bottom
  // Use Typography Element for title and description
  return (
    <Box className={classes.featureItemOuter}>
      <Box display="flex" alignItems="center" gridGap="10px">
        <Typography variant="h5">{title}</Typography>
        {icon}
      </Box>
      <Typography variant="subtitle2">{description}</Typography>
    </Box>
  );
}

export default function FeaturesSection() {
  const classes = useStyles();

  let content: { title: string; description: string; icon: JSX.Element }[] = [
    {
      title: "Private",
      description:
        "No identify verification, no email, no nothing. All connections are end-to-end encrypted and sent over the Tor network.",
      // @ts-ignore
      icon: <AnonymousIcon />,
    },
    {
      title: "Trustless",
      description:
        "You don't have to trust your counterparty. All transactions are atomic and cryptographically secured. As long as you follow the protocol, you can't be cheated out of your money.",
      icon: <DecentralizedIcon />,
    },
    {
      title: "Safe",
      description:
        "UnstoppableSwap never holds your funds. You are always in sole possesion of the crypographic keys required to spend your coins.",
      icon: <CryptographyIcon />,
    },
    {
      title: "Open Source",
      description:
        "All code is open source and available on GitHub. Anyone can audit the code and verify that it is safe. Both the cryptographic protocol and the user interface.",
      icon: <GitHubIcon />,
    },
  ];

  return (
    <Box className={classes.outer}>
      {content.map((item, index) => {
        return (
          <FeatureItem
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        );
      })}
    </Box>
  );
}
