import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function ProjectCardSkeleton() {
  return (
    <Card>
      <CardHeader
        title={<Skeleton width="60%" animation="wave" />}
        subheader={<Skeleton width="40%" animation="wave" />}
      />
      <CardContent>
        <Typography paragraph>
          <Skeleton animation="wave" style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" width="80%" />
        </Typography>
        <Typography paragraph>
          <Skeleton width="20%" animation="wave" />
        </Typography>
      </CardContent>
    </Card>
  );
}
