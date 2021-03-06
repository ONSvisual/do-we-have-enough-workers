// https://github.com/johnwalley/d3-simple-slider Version 1.4.1. Copyright 2018 John Walley.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-axis'), require('d3-dispatch'), require('d3-drag'), require('d3-ease'), require('d3-scale'), require('d3-selection'), require('d3-transition')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-array', 'd3-axis', 'd3-dispatch', 'd3-drag', 'd3-ease', 'd3-scale', 'd3-selection', 'd3-transition'], factory) :
  (global = global || self, factory(global.d3 = global.d3 || {}, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3, global.d3));
}(this, function (exports, d3Array, d3Axis, d3Dispatch, d3Drag, d3Ease, d3Scale, d3Selection) { 'use strict';

  var UPDATE_DURATION = 200;
  var SLIDER_END_PADDING = 8;

  var top = 1;
  var right = 2;
  var bottom = 3;
  var left = 4;
  var leftRight = 5;
  var topBottom = 6;

  function translateX(x) {
    return 'translate(' + x + ',0)';
  }

  function translateY(y) {
    return 'translate(0,' + y + ')';
  }

  function slider(orientation, scale) {
    scale = typeof scale !== 'undefined' ? scale : null;

    var value = [0];
    var defaultValue = [0];
    var domain = [0, 10];
    var width = 100;
    var height = 100;
    var displayValue = true;
    var handle = 'M-5.5,-5.5v10l6,5.5l6,-5.5v-10z';
    var step = null;
    var tickValues = null;
    var marks = null;
    var tickFormat = null;
    var ticks = null;
    var displayFormat = null;
    var fill = null;
    var startingTextValue = null;
    var startingValueValue=null;

    var listeners = d3Dispatch.dispatch('onchange', 'start', 'end', 'drag');

    var selection = null;
    var identityClamped = null;
    var handleIndex = null;

    var k = orientation === top || orientation === left || orientation===topBottom ? -1 : 1;
    var x = orientation === left || orientation === right || orientation === leftRight ? 'y' : 'x';
    var y = orientation === left || orientation === right || orientation === leftRight ? 'x' : 'y';

    var transformAlong =
      orientation === top || orientation === bottom || orientation === topBottom ? translateX : translateY;

    var transformAcross =
      orientation === top || orientation === bottom || orientation === topBottom ? translateY : translateX;

    var axisFunction = null;
    if(orientation===leftRight||orientation===topBottom){
      var axisFunction2=null;
    }

    switch (orientation) {
      case top:
        axisFunction = d3Axis.axisTop;
        break;
      case right:
        axisFunction = d3Axis.axisRight;
        break;
      case bottom:
        axisFunction = d3Axis.axisBottom;
        break;
      case left:
        axisFunction = d3Axis.axisLeft;
        break;
      case leftRight:
        axisFunction = d3Axis.axisRight;
        axisFunction2= d3Axis.axisLeft;
        break;
      case topBottom:
        axisFunction = d3Axis.axisTop;
        axisFunction2= d3Axis.axisBottom;
    }

    var handleSelection = null;
    var fillSelection = null;
    var textSelection = null;
    var rectSelection = null;

    if (scale) {
      domain = [d3Array.min(scale.domain()), d3Array.max(scale.domain())];

      if (orientation === top || orientation === bottom||orientation === topBottom) {
        width = d3Array.max(scale.range()) - d3Array.min(scale.range());
      } else {
        height = d3Array.max(scale.range()) - d3Array.min(scale.range());
      }

      scale = scale.clamp(true);
    }

    function slider(context) {
      selection = context.selection ? context.selection() : context;

      if (scale) {
        scale = scale.range([
          d3Array.min(scale.range()),
          d3Array.min(scale.range()) +
            (orientation === top || orientation === bottom || orientation === topBottom ? width : height),
        ]);
      } else {
        scale = domain[0] instanceof Date ? d3Scale.scaleTime() : d3Scale.scaleLinear();

        if(orientation===top||orientation===bottom||orientation===topBottom){
          scale = scale
            .domain(domain)
            .range([
              0,
              width
            ])
            .clamp(true);
        }else{
          scale = scale
            .domain(domain)
            .range([
              height,
              0
            ])
            .clamp(true);
        }


      }

      identityClamped = d3Scale.scaleLinear()
        .range(scale.range())
        .domain(scale.range())
        .clamp(true);

      // Ensure value is valid
      value = value.map(function(d) {
        return d3Scale.scaleLinear()
          .range(domain)
          .domain(domain)
          .clamp(true)(d);
      });

      tickFormat = tickFormat || scale.tickFormat();
      displayFormat = displayFormat || tickFormat || scale.tickFormat();

      var axis = selection.selectAll('.axis').data([null]);
      if(orientation===leftRight||orientation===topBottom){
        var axis2 = selection.selectAll('.axis').data([null]);

        axis2
          .enter()
          .append('g')
          .attr('transform', transformAcross(-1 * 7))
          .attr('class', 'axis2');

      }

      axis
        .enter()
        .append('g')
        .attr('transform', transformAcross(k * 7))
        .attr('class', 'axis');

      var slider = selection.selectAll('.slider').data([null]);

      var sliderEnter = slider
        .enter()
        .append('g')
        .attr('class', 'slider')
        .attr(
          'cursor',
          orientation === top || orientation === bottom || orientation === topBottom
            ? 'ew-resize'
            : 'ns-resize'
        )
        .call(
          d3Drag.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
        );

      // sliderEnter
      //   .append('line')
      //   .attr('class', 'track')
      //   .attr(x + '1', scale.range()[0] - SLIDER_END_PADDING)
      //   .attr('stroke', '#bbb')
      //   .attr('stroke-width', 12)
      //   .attr('stroke-linecap', 'round');




      if(orientation===top||orientation===bottom||orientation===topBottom){
        sliderEnter
          .append('line')
          .attr('class', 'track-inset')
          .attr(x + '1', scale.range()[0])
          .attr('stroke', '#eee')
          .attr('stroke-width', 10)
          .attr('stroke-linecap', 'round');
      }else{
        sliderEnter
          .append('line')
          .attr('class', 'track-inset')
          .attr(x + '1', scale.range()[0] - SLIDER_END_PADDING)
          .attr('stroke', '#eee')
          .attr('stroke-width', 10)
          .attr('stroke-linecap', 'round');

      }


      if (fill) {
        if(orientation===top||orientation===bottom||orientation===topBottom){
          sliderEnter
            .append('line')
            .attr('class', 'track-fill')
            .attr(
              x + '1',
              value.length === 1
                ? scale.range()[0]
                : scale(value[0])
            )
            .attr('stroke', fill)
            .attr('stroke-width', 10)
            .attr('stroke-linecap', 'round');
          }else{
            sliderEnter
              .append('line')
              .attr('class', 'track-fill')
              .attr(
                x + '1',
                value.length === 1
                  ? scale.range()[0] + SLIDER_END_PADDING
                  : scale(value[0])
              )
              .attr('stroke', fill)
              .attr('stroke-width', 10)
              .attr('stroke-linecap', 'round');
          }
      }

      if(startingTextValue!=""){
        if(orientation===left||orientation===right||orientation===leftRight){
          sliderEnter
            .append('line')
            .attr('class','starting-value')
            .attr('y1',scale(startingValueValue))
            .attr('y2',scale(startingValueValue))
            .attr('x1',-5)
            .attr('x2',5)
            .attr('stroke', '#339a59')
            .attr('stroke-width', 3)
            .attr('stroke-linecap', 'butt');

          sliderEnter
            .append('text')
            .attr('class','starting-text')
            .style('fill', '#339a59')
            .attr('y',scale(startingValueValue))
            .attr('x',-80)
            .attr('text-anchor','start')
            .text(startingTextValue);


          sliderEnter
            .append('text')
            .attr('class','starting-text')
            .style('fill', '#339a59')
            .attr('y',scale(startingValueValue)+16)
            .attr('x',-80)
            .attr('text-anchor','start')
            .text(tickFormat(startingValueValue));
        }else{
          sliderEnter
            .append('line')
            .attr('class','starting-value')
            .attr('y1',5)
            .attr('y2',-5)
            .attr('x1',scale(startingValueValue))
            .attr('x2',scale(startingValueValue))
            .attr('stroke', '#339a59')
            .attr('stroke-width', 3)
            .attr('stroke-linecap', 'butt');

          sliderEnter
            .append('text')
            .attr('class','starting-text')
            .style('fill', '#339a59')
            .attr('y',-20)
            .attr('x',scale(startingValueValue))
            .attr('text-anchor','middle')
            .text(startingTextValue+" "+tickFormat(startingValueValue));
        }
      }else if(startingValueValue!=undefined){
        if(orientation===left||orientation===right||orientation===leftRight){
          sliderEnter
            .append('line')
            .attr('class','starting-value')
            .attr('y1',scale(startingValueValue))
            .attr('y2',scale(startingValueValue))
            .attr('x1',-5)
            .attr('x2',5)
            .attr('stroke', '#339a59')
            .attr('stroke-width', 3)
            .attr('stroke-linecap', 'butt');
        }else{
          sliderEnter
            .append('line')
            .attr('class','starting-value')
            .attr('y1',5)
            .attr('y2',-5)
            .attr('x1',scale(startingValueValue))
            .attr('x2',scale(startingValueValue))
            .attr('stroke', '#339a59')
            .attr('stroke-width', 3)
            .attr('stroke-linecap', 'butt');
        }
      }

      sliderEnter
        .append('line')
        .attr('class', 'track-overlay')
        .attr(x + '1', scale.range()[0] - SLIDER_END_PADDING)
        .attr('stroke', 'transparent')
        .attr('stroke-width', 40)
        .attr('stroke-linecap', 'round')
        .merge(slider.select('.track-overlay'));


      handleSelection = sliderEnter.selectAll('.parameter-value').data(value);

      var handleEnter = handleSelection
        .enter()
        .append('g')
        .attr('class', 'parameter-value')
        .attr('transform', function(d) {
          return transformAlong(scale(d));
        })
        .attr('font-family', 'sans-serif')
        .attr(
            'text-anchor', function(){
            if(orientation===right){
              return 'start';
            }else if(orientation===left){
              return 'end';
            }else if(orientation===leftRight){
              return 'start';
            }else{
              return 'middle';
            }
          }
        );

      handleEnter
        .append('path')
        .attr('transform', 'rotate(' + (orientation + 1) * 90 + ')')
        .attr('d', handle)
        .attr('focusable','true')
        .attr('tabindex',0)
        .attr('class','handle')
        .attr('aria-label','handle')
        .attr('fill', 'white')
        .attr('stroke', '#777');

      if(orientation===left||orientation===right||orientation===leftRight){
        handleEnter
          .append('path')
          .attr('transform', 'translate(21 1) rotate(-90)')
          .attr('d', d3.symbol()
            .type(d3.symbolTriangle)
            .size(150))
          .style('fill', '#206095')
          .style('stroke',"none");
      }else if(orientation===top||orientation===bottom||orientation===topBottom){
        handleEnter
          .append('path')
          .attr('transform', 'translate(0 21)')
          .attr('d', d3.symbol()
            .type(d3.symbolTriangle)
            .size(150))
          .style('fill', '#206095')
          .style('stroke',"none");
      }

      if(orientation===leftRight){
        handleEnter
          .append('path')
          .attr('transform', 'translate(-21 1) rotate(+90)')
          .attr('d', d3.symbol()
            .type(d3.symbolTriangle)
            .size(150))
          .style('fill', '#206095')
          .style('stroke',"none");
      }

      if(orientation===topBottom){
        handleEnter
          .append('path')
          .attr('transform', 'translate(0 -21) rotate(180)')
          .attr('d', d3.symbol()
            .type(d3.symbolTriangle)
            .size(150))
          .style('fill', '#206095')
          .style('stroke',"none");
      }

      if (displayValue && value.length === 1) {

        handleEnter
          .append('text')
          .attr('font-size', 10) // TODO: Remove coupling to font-size in d3-axis
          .attr(y, k * 27)
          .attr(
            'dy',
            orientation === top
              ? '0em'
              : orientation === bottom
              ? '.71em'
              : '.32em'
          )
          .text(tickFormat(value[0]));


          var text=handleEnter.select('text');

          if(text._groups.length>0){
            var bbox = text.node().getBBox();
            handleEnter.select('text').remove();
            var padding = 5;
            var rect = handleEnter.append("rect")
              .attr("x", bbox.x - padding)
              .attr("y", bbox.y - padding)
              .attr("ry",5)
              .attr("width", bbox.width + (padding*2))
              .attr("height", bbox.height + (padding*2))
              .style("fill", "#206095");
            handleEnter
              .append('text')
              .text(tickFormat(value[0]))
              .attr('font-weight',700)
              .style('fill','white')
              .attr('y',text.attr('y'))
              .attr('x',text.attr('x'))
              .attr('dy',text.attr('dy'));
          }



      }

      if(orientation===top||orientation===bottom||orientation===topBottom){
        context
          .select('.track')
          .attr(x + '2', scale.range()[1]);

        context
          .select('.track-inset')
          .attr(x + '2', scale.range()[1]);
      }else{
        context
          .select('.track')
          .attr(x + '2', scale.range()[1] + SLIDER_END_PADDING);

        context
          .select('.track-inset')
          .attr(x + '2', scale.range()[1] - SLIDER_END_PADDING);
      }

      if (fill) {
        context
          .select('.track-fill')
          .attr(x + '2', value.length === 1 ? scale(value[0]) : scale(value[1]));
      }

      context
        .select('.track-overlay')
        .attr(x + '2', scale.range()[1] + SLIDER_END_PADDING);

      context.select('.axis').call(
        axisFunction(scale)
          .tickFormat(tickFormat)
          .ticks(ticks)
          .tickValues(tickValues)
      );

      if(orientation===leftRight||orientation===topBottom){
        context.select('.axis2').call(
          axisFunction2(scale)
          .tickFormat(tickFormat)
          .ticks(ticks)
          .tickValues(tickValues)
        );

        selection
        .select('.axis2')
        .select('.domain')
        .remove();
      }

      // https://bl.ocks.org/mbostock/4323929
      selection
        .select('.axis')
        .select('.domain')
        .remove();

      context.select('.axis').attr('transform', transformAcross(k * 7));

      context
        .selectAll('.axis text')
        .attr('fill', '#aaa')
        .attr(y, k * 20)
        .attr(
          'dy',
          orientation === top ? '0em' : orientation === bottom ? '.71em' : '.32em'
        )
        .attr(
          'text-anchor',
          orientation === right
            ? 'start'
            : orientation === left
            ? 'end'
            : 'middle'
        );

      context.selectAll('.axis line').attr('stroke', '#aaa');

      context.selectAll('.parameter-value').attr('transform', function(d) {
        return transformAlong(scale(d));
      });

      fadeTickText();

      function dragstarted() {
        d3Selection.select(this).classed('active', true);

        var pos = identityClamped(
          orientation === bottom || orientation === top || orientation === topBottom ? d3Selection.event.x : d3Selection.event.y
        );

        handleIndex = d3Array.scan(
          value.map(function(d) {
            return Math.abs(d - alignedValue(scale.invert(pos)));
          })
        );

        var newValue = value.map(function(d, i) {
          return i === handleIndex ? alignedValue(scale.invert(pos)) : d;
        });

        updateHandle(newValue);
        listeners.call(
          'start',
          slider,
          newValue.length === 1 ? newValue[0] : newValue
        );
        updateValue(newValue, true);
      }

      function dragged() {
        var pos = identityClamped(
          orientation === bottom || orientation === top || orientation === topBottom ? d3Selection.event.x : d3Selection.event.y
        );

        var adjustedValue = alignedValue(scale.invert(pos));

        var newValue = value.map(function(d, i) {
          if (value.length === 2) {
            return i === handleIndex
              ? handleIndex === 0
                ? Math.min(adjustedValue, alignedValue(value[1]))
                : Math.max(adjustedValue, alignedValue(value[0]))
              : d;
          } else {
            return i === handleIndex ? adjustedValue : d;
          }
        });

        updateHandle(newValue);
        listeners.call(
          'drag',
          slider,
          newValue.length === 1 ? newValue[0] : newValue
        );
        updateValue(newValue, true);
      }

      function dragended() {
        d3Selection.select(this).classed('active', false);

        var pos = identityClamped(
          orientation === bottom || orientation === top || orientation === topBottom ? d3Selection.event.x : d3Selection.event.y
        );

        var newValue = value.map(function(d, i) {
          return i === handleIndex ? alignedValue(scale.invert(pos)) : d;
        });

        updateHandle(newValue);
        listeners.call(
          'end',
          slider,
          newValue.length === 1 ? newValue[0] : newValue
        );
        updateValue(newValue, true);

        handleIndex = null;
      }

      textSelection = selection.select('.parameter-value text');
      fillSelection = selection.select('.track-fill');
      rectSelection = selection.select('.parameter-value rect');
    }

    function fadeTickText() {
      if (displayValue && value.length === 1) {
        var distances = [];

        selection.selectAll('.axis .tick').each(function(d) {
          distances.push(Math.abs(d - value[0]));
        });

        var index = d3Array.scan(distances);

        selection.selectAll('.axis .tick text').attr('opacity', function(d, i) {
          return i === index ? 0 : 1;
        });
      }
    }

    function alignedValue(newValue) {
      if (step) {
        var valueModStep = (newValue - domain[0]) % step;
        var alignValue = newValue - valueModStep;

        if (valueModStep * 2 > step) {
          alignValue += step;
        }

        return newValue instanceof Date ? new Date(alignValue) : alignValue;
      }

      if (marks) {
        var index = d3Array.scan(
          marks.map(function(d) {
            return Math.abs(newValue - d);
          })
        );

        return marks[index];
      }

      return newValue;
    }

    function updateValue(newValue, notifyListener) {
      if (value !== newValue) {
        value = newValue;

        if (notifyListener) {
          listeners.call(
            'onchange',
            slider,
            newValue.length === 1 ? newValue[0] : newValue
          );
        }

        fadeTickText();
      }
    }

    function updateHandle(newValue, animate) {
      animate = typeof animate !== 'undefined' ? animate : false;
      if (animate) {
        selection
          .selectAll('.parameter-value')
          .data(newValue)
          .transition()
          .ease(d3Ease.easeQuadOut)
          .duration(UPDATE_DURATION)
          .attr('transform', function(d) {
            return transformAlong(scale(d));
          });

        if (fill) {
          if(orientation===topBottom||orientation===top||orientation===bottom){
            fillSelection
              .transition()
              .ease(d3Ease.easeQuadOut)
              .duration(UPDATE_DURATION)
              .attr(
                x + '1',
                value.length === 1
                  ? scale.range()[0]
                  : scale(newValue[0])
              )
              .attr(
                x + '2',
                value.length === 1 ? scale(newValue[0]) + SLIDER_END_PADDING: scale(newValue[1])
              );
          }else{
            fillSelection
              .transition()
              .ease(d3Ease.easeQuadOut)
              .duration(UPDATE_DURATION)
              .attr(
                x + '1',
                value.length === 1
                  ? scale.range()[0] + SLIDER_END_PADDING
                  : scale(newValue[0])
              )
              .attr(
                x + '2',
                value.length === 1 ? scale(newValue[0]) : scale(newValue[1])
              );
          }


        }
      } else {
        selection
          .selectAll('.parameter-value')
          .data(newValue)
          .attr('transform', function(d) {
            return transformAlong(scale(d));
          });

        if (fill) {
          if(orientation===topBottom||orientation===top||orientation===bottom){
          fillSelection
            .attr(
              x + '1',
              value.length === 1
                ? scale.range()[0]
                : scale(newValue[0])
            )
            .attr(
              x + '2',
              value.length === 1 ? scale(newValue[0]) + SLIDER_END_PADDING: scale(newValue[1])
            );
          }else{
            fillSelection
              .attr(
                x + '1',
                value.length === 1
                  ? scale.range()[0] + SLIDER_END_PADDING
                  : scale(newValue[0])
              )
              .attr(
                x + '2',
                value.length === 1 ? scale(newValue[0]) : scale(newValue[1])
              );
          }
        }
      }

      if (displayValue) {
        textSelection.text(displayFormat(newValue[0]));
        if(orientation===leftRight){textSelection.text(ticks[(newValue[0])]);}
      }

      if(orientation!==leftRight&&orientation!==topBottom){
        var bbox = textSelection.node().getBBox();
        var padding = 5;
        rectSelection
          .attr("x", bbox.x - padding)
          .attr("width",bbox.width+(padding*2));
      }


    }

    slider.min = function(_) {
      if (!arguments.length) return domain[0];
      domain[0] = _;
      return slider;
    };

    slider.max = function(_) {
      if (!arguments.length) return domain[1];
      domain[1] = _;
      return slider;
    };

    slider.domain = function(_) {
      if (!arguments.length) return domain;
      domain = _;
      return slider;
    };

    slider.width = function(_) {
      if (!arguments.length) return width;
      width = _;
      return slider;
    };

    slider.height = function(_) {
      if (!arguments.length) return height;
      height = _;
      return slider;
    };

    slider.tickFormat = function(_) {
      if (!arguments.length) return tickFormat;
      tickFormat = _;
      return slider;
    };

    slider.displayFormat = function(_) {
      if (!arguments.length) return displayFormat;
      displayFormat = _;
      return slider;
    };

    slider.ticks = function(_) {
      if (!arguments.length) return ticks;

      ticks = _;
      return slider;
    };

    slider.value = function(_) {
      if (!arguments.length) {
        if (value.length === 1) {
          return value[0];
        }

        return value;
      }

      var toArray = Array.isArray(_) ? _ : [_];
      var pos = toArray.map(scale).map(identityClamped);
      var newValue = pos.map(scale.invert).map(alignedValue);

      updateHandle(newValue, true);
      updateValue(newValue, true);

      return slider;
    };

    slider.silentValue = function(_) {
      if (!arguments.length) {
        if (value.length === 1) {
          return value[0];
        }

        return value;
      }

      var toArray = Array.isArray(_) ? _ : [_];
      var pos = toArray.map(scale).map(identityClamped);
      var newValue = pos.map(scale.invert).map(alignedValue);

      updateHandle(newValue, false);
      updateValue(newValue, false);

      return slider;
    };

    slider.default = function(_) {
      if (!arguments.length) {
        if (defaultValue.length === 1) {
          return defaultValue[0];
        }

        return defaultValue;
      }

      var toArray = Array.isArray(_) ? _ : [_];

      defaultValue = toArray;
      value = toArray;
      return slider;
    };

    slider.startingText = function(_) {
      if (!arguments.length) return startingText;
      startingTextValue = _;
      return slider;
    };

    slider.startingValue = function(_) {
      if (!arguments.length) return startingValue;
      startingValueValue = _;
      return slider;
    };

    slider.step = function(_) {
      if (!arguments.length) return step;
      step = _;
      return slider;
    };

    slider.tickValues = function(_) {
      if (!arguments.length) return tickValues;
      tickValues = _;
      return slider;
    };

    slider.marks = function(_) {
      if (!arguments.length) return marks;
      marks = _;
      return slider;
    };

    slider.handle = function(_) {
      if (!arguments.length) return handle;
      handle = _;
      return slider;
    };

    slider.displayValue = function(_) {
      if (!arguments.length) return displayValue;
      displayValue = _;
      return slider;
    };

    slider.fill = function(_) {
      if (!arguments.length) return fill;
      fill = _;
      return slider;
    };

    slider.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? slider : value;
    };

    return slider;
  }

  function sliderHorizontal(scale) {
    return slider(bottom, scale);
  }

  function sliderVertical(scale) {
    return slider(left, scale);
  }

  function sliderTop(scale) {
    return slider(top, scale);
  }

  function sliderRight(scale) {
    return slider(right, scale);
  }

  function sliderBottom(scale) {
    return slider(bottom, scale);
  }

  function sliderLeft(scale) {
    return slider(left, scale);
  }

  function sliderLeftRight(scale){
    return slider(leftRight,scale);
  }

  function sliderTopBottom(scale){
    return slider(topBottom,scale);
  }

  exports.sliderHorizontal = sliderHorizontal;
  exports.sliderVertical = sliderVertical;
  exports.sliderTop = sliderTop;
  exports.sliderRight = sliderRight;
  exports.sliderBottom = sliderBottom;
  exports.sliderLeft = sliderLeft;
  exports.sliderLeftRight = sliderLeftRight;
  exports.sliderTopBottom = sliderTopBottom;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
