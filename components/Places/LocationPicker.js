import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { Alert, StyleSheet, Text, View } from "react-native";

import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function LocationPicker({onPickLocation}) {
  const [pickedLocation, setPickedLocation] = useState(null);
  const isFocused = useIsFocused();

  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
      onPickLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const navigation = useNavigation();

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    console.log(location, "location");

    setPickedLocation({
      lng: location.coords.longitude,
      lat: location.coords.latitude,
    });

    onPickLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });

  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let imagePreview = <Text>No Image taken.</Text>;
  if (pickedLocation) {
    imagePreview = (
      <MapView
        region={{
          latitude: pickedLocation.lat,
          latitudeDelta: 0.1,
          longitude: pickedLocation.lng,
          longitudeDelta: 0.1,
        }}
        style={styles.image}
      >
        <Marker
          coordinate={{
            latitude: pickedLocation.lat,
            longitude: pickedLocation.lng,
          }}
          title="Position"
          description="This is your current place."
        />
      </MapView>
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{imagePreview}</View>

      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
  },
});
