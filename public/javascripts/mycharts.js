/**
 * Created by cai on 2014/11/14.
 */
;(function($, window){
    function SetChart(option){
        this.select = $(option.slectedId);
        this.chartPanel = $(option.chartPanelId);
        this.url = option.url;
        this.chartOptions = option.chartOptions;
        this.myChart = null;
        //
        this.init();
    }
    SetChart.prototype = {
        consrtuctor: SetChart,
        init: function(){
            this.select.on("change", this.renderChart.bind(this));
            this.select.trigger("change");
        },
        renderChart:function(event){
            var tar = $(event.target);
            var _this = this;
            $.ajax({
                type: "GET",
                dataType:"json",
                url: _this.url + tar.val(),
                success: function(datas, state, obj){
                    _this.myChart =  window.echarts.init(_this.chartPanel.get(0));
                    _this.chartOptions.legend.data = [_this.select.find("option:selected").text()];
                    _this.chartOptions.xAxis[0].data = datas.keys;
                    _this.chartOptions.series[0].data = datas.values;
                    _this.myChart.setOption(_this.chartOptions);
                },
                error: function(data, state, obj){
                    console.log(arguments);
                }
            })
        }
    }
    $(function(){
        var chartOptions = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['testData']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : []
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    splitArea : {show : true}
                }
            ],
            series : [
                {
                    name:'values',
                    type:'line',
                    data:[]
                }
            ]
        };
        new SetChart({
            "slectedId": "#J_chartUpdate",
            "chartPanelId": "#J_chartPanel",
            "chartOptions": chartOptions,
            "url": "/mysql/"
        });
    })
})(jQuery, window);