import { K2n } from "./k2n/K2n";
import { N2k } from "./n2k/N2k";

const route = (req: any, res: any): void => {
  switch (req.method) {
    case "GET":
      res.status(200).json({ message: "get request" });
      break;
    case "POST":
      if (req.body.flag === "k2n") {
        if (K2n(req.body.value).status) {
          res.status(200).json({ message: K2n(req.body.value) });
        } else {
          console.log(K2n(req.body.value));
          res.status(204).json({ message: null });
        }
      } else {
        if (N2k(req.body.value).status) {
          res.status(200).json({ message: N2k(req.body.value) });
        } else {
          console.log(N2k(req.body.value));
          res.status(204).json({ message: null });
        }
      }
      break;
    default:
      res.status(200).json({ message: "illegal method" });
  }
};

export default route;
