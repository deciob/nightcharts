define([
  'chai', 'd3', 'sample_data', 'utils', 'sample_data'], 
function(chai, d3, data, utils, sample_data) {

  var assert = chai.assert;

  describe('getMinMaxValues', function() {

    var data  = [ [27, 21], [36, 71], [12, 322] ];

    it('should return the smaller and biggest values from the data input', function() {
      var min_max,
          data_parser = utils['simpleDataParser'];

      min_max = utils.getMinMaxValues(data, data_parser);
      assert.equal(min_max.min, 21, 
        'Expected min value to equal 21');
      assert.equal(min_max.max, 322, 
        'Expected max value to equal 322');
    });

  });


  describe('normalizeData', function() {

    var data  = [ ['a', 21], ['b', 71], ['d', 322] ],
        __    = {
          xValue: function (d) { return d[0]; },
          yValue: function (d) { return d[1]; },
          zValue: function (d) { return d[2]; },
        };

    it('should return an array of arrays such as [ordinal, quantitative]', function() {
      var normalized_data;
      __.x_scale = 'ordinal';

      normalized_data = utils.normalizeData(data, __);
      assert.equal(data[0][0], 'a', 
        'Expected input data, exit data to be the same');
      assert.equal(data[1][1], 71, 
        'Expected input data, exit data to be the same');
    });

    it('should return an array of arrays such as [ordinal, quantitative], but inverted', function() {
      var normalized_data;
      __.x_scale = 'ordinal';
      __.invert_data = true;

      normalized_data = utils.normalizeData(data, __);
      assert.equal(normalized_data[0][0], 'd', 
        'Expected input data, exit data to have same structure but reversed order');
      assert.equal(normalized_data[0][1], 322, 
        'Expected input data, exit data to have same structure but reversed order');
    });

    it('should return an array of arrays such as [time, quantitative, ordinal', function() {
      var normalized_data,
          data = [ ['1995', 21, 'a'], ['1996', 71, 'b'], ['1997', 322, 'c'] ];
      __.x_scale = 'time';
      __.date_type = 'string';
      __.date_format = '%Y';

      normalized_data = utils.normalizeData(data, __);
      assert.equal(normalized_data[0][0].getFullYear(), 1995, 
        'Expected exit data to be time object');
      assert.isTrue( normalized_data[0][2] == 'a',
        'Expected z to be = a');
    });

    it('should return an array of arrays such as [time, quantitative]', function() {
      var normalized_data,
          data = [ [1305376000, 56], [1315376000, 26], [1325376000, 66] ];
      __.x_scale = 'time';
      __.date_type = 'epoch';

      normalized_data = utils.normalizeData(data, __);
      assert.isTrue( normalized_data[1][0].getMonth() == 8,
        'Expected exit data to be time object, September');
    });

  });

  describe('groupNormalizedDataByIndex (option object)', function() {

    var data  = [ ['a', 21], ['a', 71], ['d', 322] ],
        __    = {
          xValue: function (d) { return d[0]; },
          yValue: function (d) { return d[1]; },
          zValue: function (d) { return d[2]; },
        };

    it('should return an array of objects such as {identifier: [[ordinal, quantitative],]}', function() {
      var normalized_data;
      __.x_scale = 'ordinal';

      normalized_data = utils.normalizeData(data, __);
      groupedData = utils.groupNormalizedDataByIndex(
        0, normalized_data, __, {grouper: 'object'});
      assert.equal(groupedData.a[0][0], 'a', 
        'Expected...');
      assert.equal(groupedData.d[0][0], 'd', 
        'Expected...');
    });

  });

  describe('groupNormalizedDataByIndex (option array)', function() {

    var data  = [ ['a', 21], ['a', 71], ['d', 322] ],
        __    = {
          xValue: function (d) { return d[0]; },
          yValue: function (d) { return d[1]; },
          zValue: function (d) { return d[2]; },
        };

    it('should return an array of arrays such as [ [[ordinal, quantitative],], ]}', function() {
      var normalized_data;
      __.x_scale = 'ordinal';

      normalized_data = utils.normalizeData(data, __);
      groupedData = utils.groupNormalizedDataByIndex(
        0, normalized_data, __, {grouper: 'array'});
      assert.equal(groupedData[0][0][0], 'a', 
        'Expected...');
      assert.equal(groupedData[1][0][0], 'd', 
        'Expected...');
    });

  });


});