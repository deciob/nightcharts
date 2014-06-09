define([
  'd3',
  'underscore',
  'chart'
], function(d3, _, chart) {
  'use strict';

  var BarFrameController = function (args) {

    var self = this,
        selection = d3.select(args.selector),
        data = args.data,
        normalized_data,
        grouped_data,
        barchart,
        draw_dispatch,
        drawChart,
        frame_config, 
        frame, 
        year = 1950, 
        delta = 5, 
        draw;

    barchart = chart.composer()
      .margin({left: 230, bottom: 35})
      .height(600)
      .duration(300)
      .yValue( function(d) { return d['agglomeration']; } )
      .xValue( function(d) { return d['population']; } )
      .zValue(function(d) {return d.year})
      .components(['x_axis', 'y_axis', 'bars'])
      .scale_bounds('0,40')
      .invert_data(true)
      .y_scale('ordinal')
      .x_scale('linear')
      .x_axis({tickValues: ['0', '20', '40']})
      .delay(function(){return 0;})
      .drawDispatch(d3.dispatch('draw_bar'));
    normalized_data = chart.utils.normalizeData(data, barchart.__);
    grouped_data = chart.utils.groupNormalizedDataByIndex(
      2, normalized_data, barchart.__, {grouper: 'object'});
    //console.log(grouped_data);
    draw = chart.draw(barchart, selection);


    drawChart = function (data, options) {
      draw(data, options);
    }

    draw_dispatch = barchart.drawDispatch();
    draw_dispatch.on('draw_bar', drawChart);
  
    this.transition = chart.Frame(barchart.__)
      .draw_dispatch(draw_dispatch)
      .data(grouped_data)
      .initial_frame(year)
      .step(50)
      .delta(delta)
      .dispatch_identifier('_bar')
      .frame_identifier_index(0)();
  
    barchart.handleTransitionEnd( function () {
      self.transition.dispatch.end_bar.call(self.transition);
    });
  
    this.transition.dispatch.jump_bar.call(this.transition, year);

    this.barchart = barchart;

  };

  BarFrameController.prototype.updateSelections = function(selections) {
    var current_rect_selection = selections[1],
        current_text_selection = selections[0],
        active_rect_selections = d3.selectAll('#bar-frame-viz > svg g.bars rect.active'),
        active_text_selections = d3.selectAll('#bar-frame-viz > svg g.y text.active');

    function classSelections(active_selections) {
      if ( !d3.select(this).classed('active') && active_selections[0].length > 1 ) {
        d3.select(active_selections[0].slice(-1)[0]).classed('active', false);
        return true;
      } else if ( !d3.select(this).classed('active') && active_selections[0].length < 2 ) {
        return true;
      } else if ( active_selections[0].length > 1 || d3.select(this).classed('active') ) {
        return false;
      }
      
    }

    current_rect_selection.classed('active', function(d) {
      return classSelections.call(this, active_rect_selections);
    });
    current_text_selection.classed('active', function(d) {
      return classSelections.call(this, active_text_selections);
    });

    return d3.selectAll('#bar-frame-viz > svg g.y text.active');
  }

  BarFrameController.prototype.getSelections = function(event) {
    var wrapper_element,
        wrapper_element_idx,
        tag_name, 
        text_selection, 
        rect_selection;
    tag_name = event.target.tagName;
    if ( tag_name == 'text' ) {
      wrapper_element = event.target.parentElement;
      wrapper_element_idx = Array.prototype.indexOf.call(
          event.target.parentElement.parentElement.children, wrapper_element);
      text_selection = d3.select(event.target);
      rect_selection = d3.select(
        d3.selectAll('#bar-frame-viz > svg g.bars rect')[0][wrapper_element_idx]);
    } else {
      wrapper_element = event.target;
      wrapper_element_idx = Array.prototype.indexOf.call(
          event.target.parentElement.children, wrapper_element);
      rect_selection = d3.select(event.target);
      text_selection = d3.select(
        d3.selectAll('#bar-frame-viz > svg g.y text')[0][wrapper_element_idx]);
    }
    return [text_selection, rect_selection];
  }

  BarFrameController.prototype.start = function() {
    this.transition.dispatch.start_bar.call(this.transition);
  }

  BarFrameController.prototype.stop = function() {
    this.transition.dispatch.stop_bar.call(this.transition);
  }

  BarFrameController.prototype.reset = function() {
    this.barchart.duration(300);
    this.transition.dispatch.reset_bar.call(this.transition);
  }

  BarFrameController.prototype.jump = function() {
    this.barchart.duration(1400);
    this.transition.dispatch.jump_bar.call(this.transition, 2020);
  }

  return BarFrameController;
  
});