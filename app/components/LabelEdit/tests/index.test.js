import { mount, shallow } from 'enzyme';
import React from 'react';
import { fieldTypes } from '../../../utils/fieldType';
import { LabelEdit } from '../LabelEdit';

const vdcData = {
  id: 1,
  name: 'PV Power',
  value: 141.3,
  isEditable: false,
  units: fieldTypes.vdc,
};

const booleanData = {
  id: 1,
  name: 'PV Power',
  value: true,
  isEditable: false,
  type: fieldTypes.boolean,
};

describe('<LabelEdit />', () => {
  const onChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#constructor', () => {
    it('should render <LabelEdit /> component with string value', () => {
      const wrapper = shallow(
        <LabelEdit onChange={onChangeSpy} {...vdcData} />
      );

      expect(wrapper.childAt(0).text()).toBe('141.3');
      expect(wrapper.childAt(1).text()).toBe('VDC');
    });

    it('should render <LabelEdit /> component with true value (ON label)', () => {
      const wrapper = shallow(
        <LabelEdit onChange={onChangeSpy} {...booleanData} />
      );

      expect(wrapper.childAt(0).text()).toBe('ON');
    });

    it('should render <LabelEdit /> component with false value (OFF label)', () => {
      const booleanDataTest = { ...booleanData };
      booleanDataTest.value = false;

      const wrapper = shallow(
        <LabelEdit onChange={onChangeSpy} {...booleanDataTest} />
      );

      expect(wrapper.childAt(0).text()).toBe('OFF');
    });
  });

  describe('#input', () => {
    it('should render <LabelEdit /> as input text when is editable and call change', () => {
      const vdcDataTest = { ...vdcData };
      vdcDataTest.isEditable = true;

      const wrapper = mount(
        <LabelEdit onChange={onChangeSpy} editMode {...vdcDataTest} />
      );

      wrapper.find('input').simulate('change');

      expect(onChangeSpy).toHaveBeenCalled();
    });

    it('should render <LabelEdit /> as input text when is editable', () => {
      const vdcDataTest = { ...vdcData };
      vdcDataTest.isEditable = true;

      const wrapper = mount(
        <LabelEdit onChange={onChangeSpy} editMode {...vdcDataTest} />
      );

      expect(wrapper.find('input')).toBeDefined();
      expect(wrapper.find('input').prop('value')).toBe(vdcDataTest.value);
    });
  });

  describe('#toggle', () => {
    it('should render <LabelEdit /> as toggle when is editable', () => {
      const booleanDataTest = { ...booleanData };
      booleanDataTest.isEditable = true;

      const wrapper = mount(
        <LabelEdit onChange={onChangeSpy} editMode {...booleanDataTest} />
      );

      expect(wrapper.find('button')).toBeDefined();
    });

    it('should render <LabelEdit /> as toggle when is editable and not call change', () => {
      const booleanDataTest = { ...booleanData };
      booleanDataTest.isEditable = true;

      const wrapper = mount(
        <LabelEdit onChange={onChangeSpy} editMode {...booleanDataTest} />
      );
      const toggleOptions = wrapper.find('button');
      const offOption = toggleOptions
        .findWhere((n) => n.prop('value') === !booleanDataTest.value)
        .first();

      offOption.simulate('click');

      expect(onChangeSpy).toHaveBeenCalled();
    });

    it('should render <LabelEdit /> as toggle when is editable and call change', () => {
      const booleanDataTest = { ...booleanData };
      booleanDataTest.isEditable = true;

      const wrapper = mount(
        <LabelEdit onChange={onChangeSpy} editMode {...booleanDataTest} />
      );
      const toggleOptions = wrapper.find('button');
      const onOption = toggleOptions
        .findWhere((n) => n.prop('value') === booleanDataTest.value)
        .first();

      onOption.simulate('click');

      expect(onChangeSpy).not.toHaveBeenCalled();
    });
  });
});
