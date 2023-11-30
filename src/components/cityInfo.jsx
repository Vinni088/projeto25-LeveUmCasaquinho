import React from 'react';
import styled from 'styled-components';

const LocationInfoWrapper = styled.div`
  #coords {
    padding: 10px 0px;
    gap: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

const LocationInfo = ({ cityName, latitude, longitude }) => {
    return (
        <LocationInfoWrapper>
            <h1>{cityName}</h1>
            <div id='coords'>
                <h3>Lat: {latitude}</h3>
                <h3>Long: {longitude}</h3>
            </div>
        </LocationInfoWrapper>
    );
};

export default LocationInfo;
