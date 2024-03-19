import React from 'react';
import GooglePlacesAutocomplete, {geocodeByPlaceId} from 'react-google-places-autocomplete';
import {resetLocationPointer, setGeocodeData} from "@/app/Stores/LocationsSlice";
import {useFormatAddress} from "@/app/Utils/useFormatAddress";
import {useAppDispatch} from "@/app/Stores/Store";

interface props {
    dark?: boolean
}
const TextField: React.FC<props> = ({dark = false}) => {
    const dispatch = useAppDispatch()
    const formatAddress = useFormatAddress
    function handleSelect(place: any) {
        geocodeByPlaceId(place.value.place_id)
            .then(results => {
                const formattedAddress = formatAddress(results[0].formatted_address)
                dispatch(setGeocodeData({
                    placeID:results[0].place_id,
                    address:formattedAddress,
                    location: results[0].geometry.location.toJSON()
                }))
                dispatch(resetLocationPointer())
            })
    }


    return (
        <GooglePlacesAutocomplete apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                                  selectProps={{
                                      onChange: handleSelect,
                                      classNames: {
                                          container: (state) => ((state.isFocused ? "max-md:w-5/6 w-4/6" : "max-md:w-4/6 w-[13rem]") + " duration-300 "),
                                          control: () => "rounded-card",
                                          menu: () => "rounded-card",
                                          menuList: () => "text-black",

                                      },
                                      styles: {
                                          control: (baseStyles) => ({
                                              ...baseStyles,
                                              backgroundColor: "transparent !important",
                                              border: `${dark ? "#60A5FA" : "#FFFFFF7F"} 2.5px solid`,
                                              boxShadow: "none",
                                              ":hover": {
                                                  border: `${dark ? "#60A5FA" : "#FFFFFF7F"} 2.5px solid`
                                              }
                                          }),
                                          input: (provided) => ({
                                              ...provided,
                                              color: `${dark ? "black" : "white"}`
                                          }),
                                          placeholder: (provided) => ({
                                              ...provided,
                                              color: `${dark ? "black" : "white"}`
                                          }),
                                          dropdownIndicator: (provided) => ({
                                              ...provided,
                                              color: `${dark ? "black" : "white"}`
                                          }),
                                          singleValue:(provided) => ({
                                             ...provided,
                                              color:dark? "black":"white",
                                              opacity:0.65
                                          })

                                      },
                                      openMenuOnClick: false,
                                      placeholder: "Search",
                                  }
                                  }
                                  debounce={1000}
        />
    );
};

export default TextField;
