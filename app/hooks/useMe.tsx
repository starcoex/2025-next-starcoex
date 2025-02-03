import { useQuery } from "@apollo/client";
import { ME_GQL } from "@/app/graphql/authGql/me-gql";
import { MeGqlQuery } from "@/generated/graphql";

const useMe = () => {
  const { loading, data } = useQuery<MeGqlQuery>(ME_GQL);
  return {
    loading,
    meGql: data?.meGql.user,
  };
};

export default useMe;
