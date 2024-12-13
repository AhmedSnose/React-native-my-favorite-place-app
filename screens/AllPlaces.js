import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchAllPlaces } from "../database";

function AllPlaces({ route }) {
  const [places, setPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const laodPlaces = async () => {
      const data = await fetchAllPlaces();
      setPlaces(data);
    };

    if (isFocused) 
      laodPlaces();
    
  }, [isFocused]);

  return <PlacesList places={places} />;
}

export default AllPlaces;
