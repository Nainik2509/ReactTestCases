import { act, fireEvent, getByTestId, render } from '@testing-library/react';
import React from 'react'
import apiClient from '../services/apiClient';
import bookingDialogService from '../services/bookingDialogService';
import notificationService from '../services/notificationService';
import HomeBooking from './HomeBooking'

let container = null;

const mockedHome = {
    "title": "Superb duplex apartment in the historical center",
    "image": "listing.jpg",
    "location": "New York, NY",
    "price": "289"
}

beforeEach(() => {
    container = render(<HomeBooking home={mockedHome} />).container;
})

it('Should show title', () => {
    expect(getByTestId(container, 'title').textContent).toBe('Superb duplex apartment in the historical center')
})

it('Should show price', () => {
    expect(getByTestId(container, 'price').textContent).toBe('$289 per night')
})

it('Should show check-in date field', () => {
    expect(getByTestId(container, 'check-in')).toBeTruthy()
})

it('Should show check-out date field', () => {
    expect(getByTestId(container, 'check-out')).toBeTruthy()
})

it('Should calculate total', () => {

    // Enter check-in date : 2020-12-04
    fireEvent.change(
        getByTestId(container, 'check-in'),
        { target: { value: '2020-12-04' } }
    )

    // Enter check-out date : 2020-12-07
    fireEvent.change(
        getByTestId(container, 'check-out'),
        { target: { value: '2020-12-07' } }
    )

    //assert the total : 3*289 = 867
    expect(getByTestId(container, 'total').textContent).toBe('Total : $867')
})

it('Should show "--" for invalid dates', () => {

    fireEvent.change(
        getByTestId(container, 'check-in'),
        { target: { value: '2020-12-04' } }
    )

    fireEvent.change(
        getByTestId(container, 'check-out'),
        { target: { value: '2020-12-02' } }
    )

    expect(getByTestId(container, 'total').textContent).toBe('Total : $--')
})


it('Should book home after clicking the Book button', () => {

    // Spy on apiClient
    jest.spyOn(apiClient, 'bookHome').mockImplementation(() => {
        return Promise.resolve({ message: 'Mocked Home Booked' });
    })
    // select dates
    // Enter check-in date : 2020-12-04
    fireEvent.change(
        getByTestId(container, 'check-in'),
        { target: { value: '2020-12-04' } }
    )

    // Enter check-out date : 2020-12-07
    fireEvent.change(
        getByTestId(container, 'check-out'),
        { target: { value: '2020-12-07' } }
    )

    // click the book button
    getByTestId(container, 'book-btn').click();

    // assert that apiClient booked the home 
    expect(apiClient.bookHome).toHaveBeenCalledWith(mockedHome, '2020-12-04', '2020-12-07')

})
// 

it('Should close the dialog and show notification after booking home', async () => {

    // spy on api client
    jest.spyOn(apiClient, 'bookHome').mockImplementation(() => Promise.resolve({ message: 'Mocked Home Booked' }))

    // spy on bookingDialog services
    jest.spyOn(bookingDialogService, 'close').mockImplementation(() => { })

    // spy on notification services
    jest.spyOn(notificationService, 'open').mockImplementation(() => { })

    // enter dates and click BOOK button
    fireEvent.change(
        getByTestId(container, 'check-in'),
        { target: { value: '2020-12-04' } }
    )

    // Enter check-out date : 2020-12-07
    fireEvent.change(
        getByTestId(container, 'check-out'),
        { target: { value: '2020-12-07' } }
    )

    // click the book button
    getByTestId(container, 'book-btn').click();
    await act(async () => { })

    // assert  that dialog service closed the dialog 
    expect(bookingDialogService.close).toHaveBeenCalled()
    // assert  that notification service posted a notification 
    expect(notificationService.open).toHaveBeenCalledWith('Mocked Home Booked')
})

it('Should show empty when no home provided', () => {

    container = render(<HomeBooking home={null} />).container;
    expect(getByTestId(container, 'empty')).toBeTruthy()
})