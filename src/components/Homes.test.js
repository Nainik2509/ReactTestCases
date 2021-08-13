import { act, getAllByTestId, getByTestId, getNodeText, render } from '@testing-library/react';
import React from 'react'
import apiClient from '../services/apiClient';
import bookingDialogService from '../services/bookingDialogService';
import Homes from './Homes';

let container = null;

beforeEach(async () => {

    jest.spyOn(apiClient, 'getHomes').mockImplementation(() => {
        return Promise.resolve([
            {
                "title": "Superb duplex apartment in the historical center",
                "image": "listing.jpg",
                "location": "New York, NY",
                "price": "289"
            },
            {
                "title": "Charming house with woodstove",
                "image": "listing.jpg",
                "location": "San Francisco, CA",
                "price": "340"
            },
            {
                "title": "Nice Clean Room in Brownstone Studio",
                "image": "listing.jpg",
                "location": "New York, NY",
                "price": "291"
            },
            {
                "title": "Bright and Sunny Shared Room in Downtown",
                "image": "listing.jpg",
                "location": "Chicago, IL",
                "price": "357"
            },
            {
                "title": "Cape Cod Style House on South Shore",
                "image": "listing.jpg",
                "location": "Boston, MA",
                "price": "243"
            },
            {
                "title": "Large Private Room Facing Golden Bridge",
                "image": "listing.jpg",
                "location": "Washington, DC",
                "price": "299"
            }
        ]);
    })
    container = render(<Homes />).container;

    await act(async () => { })
})

it('should show homes', () => {

    const homes = getAllByTestId(container, 'home');

    expect(homes.length).toBeGreaterThan(0);
})

it('should show home title', () => {

    const homeTitles = getAllByTestId(container, 'home-title');

    expect(getNodeText(homeTitles[0])).toBe('Superb duplex apartment in the historical center');
})

it('should show home Image', () => {

    const homeImages = getAllByTestId(container, 'home-image');

    expect(homeImages[0]).toBeTruthy();
})

it('should show home location', () => {

    const homeLocations = getAllByTestId(container, 'home-locations');

    expect(getNodeText(homeLocations[0])).toBe('New York, NY');
})

it('should show home price', () => {

    const homePrices = getAllByTestId(container, 'home-price');

    expect(getNodeText(homePrices[0])).toBe('$289/night');
})

it('should show home booking button', () => {

    const homeBookingbtn = getAllByTestId(container, 'home-booking-btn');

    expect(homeBookingbtn[0]).toBeTruthy();
})

it('should show home booking dialog when clicking the button', () => {

    jest.spyOn(bookingDialogService, 'open').mockImplementation(() => { })

    const homeBookingbtn = getAllByTestId(container, 'home-booking-btn');

    homeBookingbtn[0].click();

    expect(bookingDialogService.open).toHaveBeenCalledWith({
        "title": "Superb duplex apartment in the historical center",
        "image": "listing.jpg",
        "location": "New York, NY",
        "price": "289"
    });
})

