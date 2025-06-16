import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.route.tsx"),
  ...prefix("company", [route(":id", "./routes/company.route.tsx")]),
] satisfies RouteConfig;
