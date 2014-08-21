define('HUD',

['vent', 'util', 'Sprite'],

function( vent, util ){

    'use strict';

    var init,
        ctx,
        canvas,
        update,
        render,
        bindEvents,
        drawItems,
        score,
        draw,
        cfg;


    cfg = {
        earthEmblem: {
            fillStyle: [
                '#372720',
                'rgba(73, 52, 42, 0.5)',
                'rgba(104, 74, 59, 0.3)'
            ],
            size: 15,
            x: 30,
            y: 575,
            angle: 0,
            displayProps: {
                shadowOffsetX: 0,
                shadowOffsetY: 0
            }
        },
        waterEmblem: {
            fillStyle: [
                'rgba(0, 0, 220, 1)'
            ],
            size: 15,
            x: 65,
            y: 575,
            angle: 0,
            displayProps: {
                shadowOffsetX: 0,
                shadowOffsetY: 0
            }
        },
        airEmblem: {
            fillStyle: [
                'rgba(241, 241, 241, 1)'
            ],
            size: 15,
            x: 100,
            y: 575,
            angle: 0,
            displayProps: {
                shadowOffsetX: 0,
                shadowOffsetY: 0
            }
        },
        fireEmblem: {
            fillStyle: [
                'rgba(255, 0, 0, 1)'
            ],
            size: 15,
            x: 135,
            y: 575,
            angle: 0,
            displayProps: {
                shadowOffsetX: 0,
                shadowOffsetY: 0
            }
        }
    };


    drawItems = {
        bar: function( ctx ){
            ctx.beginPath();
            ctx.rect(0, ctx.canvas.height - 50, ctx.canvas.width, 50);
            ctx.fillStyle = '#333';
            ctx.shadowBlur = 0;
            ctx.fill();

            ctx.beginPath();
            ctx.rect(0, ctx.canvas.height - 52, ctx.canvas.width, 2);
            ctx.fillStyle = '#444';
            ctx.shadowBlur = 0;
            ctx.fill();
        },
        score: function( ctx ) {
            ctx.font = "20px Courier";
            ctx.fillStyle = '#f1f1f1';
            ctx.textAlign = 'right';
            ctx.fillText(
                'Score: ' + score,
                ctx.canvas.width - 25, ctx.canvas.height - 20
            );
        },
        earthEmblem: function( ctx ){
            var c = cfg.earthEmblem;
            util.polygon(ctx, c.x, c.y, c.size, 7,
                c.fillStyle[0], c.displayProps, c.angle
            );
            util.circle(ctx, c.x, c.y, c.size, c.fillStyle[0]);
            util.polygon(ctx, c.x, c.y, c.size*0.8, 5,
                c.fillStyle[1], {}, c.angle
            );
            util.polygon(ctx, c.x, c.y, c.size*0.3, 4,
                c.fillStyle[2], {}, c.angle
            );
        },
        waterEmblem: function( ctx ){
            var c = cfg.waterEmblem;
            util.circle(ctx, c.x, c.y, c.size, c.fillStyle[0]);
        },
        airEmblem: function( ctx ){
            var c = cfg.airEmblem;
            util.circle(ctx, c.x, c.y, c.size, c.fillStyle[0]);
        },
        fireEmblem: function( ctx ){
            var c = cfg.fireEmblem;
            util.circle(ctx, c.x, c.y, c.size, c.fillStyle[0]);
        }
    };


    init = function( obj ){
        var cvs = document.createElement('canvas');
        ctx = cvs.getContext('2d');
        cvs.width = obj.width;
        cvs.height = obj.height;
        cvs.id = 'hud-canvas';
        util.getById('game-container').appendChild(cvs);
        canvas = {
            width: cvs.width,
            height: cvs.height,
            ctx: ctx
        };

        score = 0;

        vent.on('update', update);
        vent.on('render', render);
    };


    bindEvents = function(){
        vent.on('effects-canvas-added', function( obj ){
            init(obj);
        });
        vent.on('enemy-down', function(){
            score += 2;
        });
    };


    update = function(){

    };


    render = function(){
        ctx.clearRect(0, 0, ctx.canvas.width, 50);
        draw('bar');
        draw('score');
        draw('earthEmblem');
        draw('waterEmblem');
        draw('airEmblem');
        draw('fireEmblem');
    };


    draw = function( name ){
        drawItems[name](ctx);
    };


    bindEvents();

});
