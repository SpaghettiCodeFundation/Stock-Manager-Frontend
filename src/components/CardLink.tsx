import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

interface IProps {
  href: string;
  text: string;
  icon: React.ReactNode;
}

const CardLink: React.FC<IProps> = ({ href, text, icon }) => {
  const navigate = useNavigate();
  return (
    <Card className="cursor-pointer" onClick={() => navigate(href)}>
      <CardHeader>
        <CardTitle>{text}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-7xl">{icon}</div>
      </CardContent>
    </Card>
  );
};

export default CardLink;
