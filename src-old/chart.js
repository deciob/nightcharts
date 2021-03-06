define([
  "d3", 
  "d3_tip",
  "draw",
  "base_config",
  "utils/mixins",
  "mixins/data",
  "mixins/layout",
  "mixins/scale",
  "mixins/axis",
  "mixins/chart",
  "bar/config",
  "bar/mixins", 
  "bar/bar",
  "line/config",
  "line/mixins",
  "line/line",
  "circle/config",
  "circle/mixins",
  "circle/circle",
  "frame/config",
  "frame/states",
  "frame/state_machine",
  "frame/mixins",
  "frame/frame"
], function(
  d3, 
  d3_tip,
  draw, 
  base_config, 
  utils_mixins, 
  data_mixins, 
  layout_mixins, 
  scale_mixins,
  axis_mixins,
  chart_mixins,
  bar_config,
  bar_mixins,
  Bar,
  line_config,
  line_mixins,
  Line,
  circle_config,
  circle_mixins,
  Circle,
  frame_config,
  states,
  StateMachine,
  frame_mixins, 
  Frame
) {

  d3.d3_tip = d3_tip;

  return {
    d3: d3,
    draw: draw,
    base_config: base_config,
    utils_mixins: utils_mixins,
    data_mixins: data_mixins,
    layout_mixins: layout_mixins,
    scale_mixins: scale_mixins,
    axis_mixins: axis_mixins,
    chart_mixins: chart_mixins,
    bar_config: bar_config,
    bar_mixins: bar_mixins,
    Bar: Bar,
    line_config: line_config,
    line_mixins: line_mixins,
    Line: Line,
    circle_config: circle_config,
    circle_mixins: circle_mixins,
    Circle: Circle,
    frame_config: frame_config,
    Frame: Frame,
    states: states,
    StateMachine: StateMachine,
    frame_mixins: frame_mixins,
  };

});

