import React, { useState } from 'react';
import { Input, RadioGroup, Radio } from 'rsuite';

const FilterItems = ({ filterByImportance, setSearchItems }) => {
  const placements = ['all', 'info', 'success', 'warning', 'error', 'done'];

  const [placement, setPlacement] = useState('all');

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F5',
        padding: '.5em',
        marginBottom: '.5em',
        borderRadius: '10px',
      }}>
      <RadioGroup
        style={{ padding: '0px', margin: '0px' }}
        name='radioList'
        inline
        appearance='picker'
        value={placement}
        onChange={(placement) => {
          setPlacement(placement);
          filterByImportance(placement);
        }}>
        {placements.map((item) => (
          <Radio
            value={item}
            key={item}
            style={{ padding: '0px', margin: '0px' }}>
            {item}
          </Radio>
        ))}
      </RadioGroup>
      <Input
        placeholder={'Search'}
        size='sm'
        style={{ width: '10em' }}
        onChange={(value, checked, event) => {
          setSearchItems(value, checked, event);
        }}
      />
    </div>
  );
};

export default FilterItems;
