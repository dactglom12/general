import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Counter, Props } from '../Counter';
import { testIds } from '../constants';
import '@testing-library/jest-dom/extend-expect';

const setUp = (props?: Props) => render(<Counter {...props} />);

describe('Given Counter component', () => {
  it('When increment button is clicked, it should display correct counter value', () => {
    const { getByTestId } = setUp();

    const incrementButton = getByTestId(testIds.increment);

    fireEvent.click(incrementButton);

    expect(getByTestId(testIds.counter)).toHaveTextContent('1');
  });

  it('When decrement button is clicked, it should display correct counter value', () => {
    const { getByTestId } = setUp();

    const decrementButton = getByTestId(testIds.decrement);

    fireEvent.click(decrementButton);

    expect(getByTestId(testIds.counter)).toHaveTextContent('-1');
  });
});
