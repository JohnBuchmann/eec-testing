export const fieldTypes = {
  vdc: 'VDC',
  ampere: 'A',
  boolean: 'boolean',
  celsius: 'C',
  fahrenheit: 'F',
};

/*
 * getFieldTypeUnitMeasure
 * Get unit measure related to a field type
 * @return {object} object with unit measure labels
 */
export function getFieldTypeUnitMeasure(fieldType) {
  let unitMeasure;

  switch (fieldType) {
    case fieldTypes.vdc:
      unitMeasure = {
        unitMeasureSymbol: 'V',
        unitMeasureSymbolSuffix: 'DC',
      };
      break;
    case fieldTypes.ampere:
      unitMeasure = {
        unitMeasureSymbol: 'A',
      };
      break;
    case fieldTypes.celsius:
      unitMeasure = {
        unitMeasureSymbol: 'C',
      };
      break;
    case fieldTypes.fahrenheit:
      unitMeasure = {
        unitMeasureSymbol: 'F',
      };
      break;
    case fieldTypes.time:
      unitMeasure = {
        unitMeasureSymbol: '',
      };
      break;
    default:
      unitMeasure = {
        unitMeasureSymbol: fieldType,
      };
      break;
  }

  return unitMeasure;
}
