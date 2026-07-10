import { Pokedex } from "@/misc/pokedex-promise-v2";
import { titleCase } from "@/misc/title-case";

const nav = [];

for (const [routeGroup, routes] of Object.entries(Pokedex.api.route.groups)) {
  nav.push({
    name: titleCase(routeGroup),
    type: "separator",
  });

  for (const [route, { rootEndpoint }] of Object.entries(routes))
    nav.push({
      name: `${titleCase(route)} (${
        (await Pokedex.api[rootEndpoint]()).data.count
      })`,
      url: `/${route}`,
    });
}

export default nav;
