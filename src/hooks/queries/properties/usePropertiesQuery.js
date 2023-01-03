import { useQuery } from "react-query";
import { QueryService, PATH_TYPES } from "lib/QueryService";
import API_ENDPOINTS from "constants/endpoints";

const propertiesQueryServices = new QueryService(API_ENDPOINTS.PROPERTIES, PATH_TYPES.PUBLIC);

export const fetchProperties = async ({ queryKey }) => {
  const { data, meta } =  await propertiesQueryServices.get(queryKey[1]);
  return { data, meta };
};

const usePropertiesQuery = ({ params, config = {} }) => {
  return useQuery([API_ENDPOINTS.PROPERTIES, params], fetchProperties, {
    refetchOnWindowFocus: false,
    ...config
  });
};

export default usePropertiesQuery;
