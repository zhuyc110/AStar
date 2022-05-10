/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/actor/a-star-actor.ts":
/*!***********************************!*\
  !*** ./src/actor/a-star-actor.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AStarActor\": () => (/* binding */ AStarActor)\n/* harmony export */ });\n/* harmony import */ var _common_priority_queue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/priority-queue */ \"./src/common/priority-queue.ts\");\n/* harmony import */ var _actor_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actor-base */ \"./src/actor/actor-base.ts\");\n\n\nclass AStarActor extends _actor_base__WEBPACK_IMPORTED_MODULE_1__.ActorBase {\n    goToGoal() {\n        const bricks = this.world.objects.filter(x => x.stringify !== this.goal.stringify);\n        const cost = new Map();\n        cost.set(this.start.stringify, 0);\n        const queue = new _common_priority_queue__WEBPACK_IMPORTED_MODULE_0__.PriorityQueue();\n        queue.enqueue(this.start, 0);\n        while (queue.length > 0) {\n            const current = queue.dequeue();\n            if (current.stringify === this.goal.stringify) {\n                this.visited.push(current);\n                break;\n            }\n            this.visited.push(current);\n            const neighbors = this.getNeighbors(current);\n            for (let neighbor of neighbors) {\n                if (bricks.find(x => x.stringify === neighbor.stringify)) {\n                    continue;\n                }\n                if (neighbor.stringify === this.goal.stringify) {\n                    neighbor = this.goal;\n                }\n                const newCost = cost.get(current.stringify) + 1;\n                if (!cost.has(neighbor.stringify) ||\n                    newCost < cost.get(neighbor.stringify)) {\n                    const priority = newCost + this.getDistance(neighbor, this.goal);\n                    cost.set(neighbor.stringify, newCost);\n                    queue.enqueue(neighbor, priority);\n                    this.mapPath.set(neighbor, current);\n                }\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack://demo/./src/actor/a-star-actor.ts?");

/***/ }),

/***/ "./src/actor/actor-base.ts":
/*!*********************************!*\
  !*** ./src/actor/actor-base.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ActorBase\": () => (/* binding */ ActorBase)\n/* harmony export */ });\n/* harmony import */ var _game_infra_position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game-infra/position */ \"./src/game-infra/position.ts\");\n\nclass ActorBase {\n    constructor(world, start, goal) {\n        this.world = world;\n        this.start = start;\n        this.goal = goal;\n        this.visited = [];\n        this.mapPath = new Map();\n    }\n    get pathToPrint() {\n        const realPath = [this.goal];\n        let pointer = this.goal;\n        while (pointer) {\n            const next = this.mapPath.get(pointer);\n            if (!next) {\n                break;\n            }\n            realPath.push(next);\n            pointer = next;\n        }\n        return realPath;\n    }\n    getNeighbors(position) {\n        const result = [];\n        if (position.x > 0) {\n            const potential = new _game_infra_position__WEBPACK_IMPORTED_MODULE_0__.Position(position.x - 1, position.y);\n            result.push(potential);\n        }\n        if (position.x < this.world.bound.x - 1) {\n            const potential = new _game_infra_position__WEBPACK_IMPORTED_MODULE_0__.Position(position.x + 1, position.y);\n            result.push(potential);\n        }\n        if (position.y > 0) {\n            const potential = new _game_infra_position__WEBPACK_IMPORTED_MODULE_0__.Position(position.x, position.y - 1);\n            result.push(potential);\n        }\n        if (position.y < this.world.bound.y - 1) {\n            const potential = new _game_infra_position__WEBPACK_IMPORTED_MODULE_0__.Position(position.x, position.y + 1);\n            result.push(potential);\n        }\n        return result;\n    }\n    getDistance(position, target) {\n        return Math.abs(position.x - target.x) + Math.abs(target.y - position.y);\n    }\n}\n\n\n//# sourceURL=webpack://demo/./src/actor/actor-base.ts?");

/***/ }),

/***/ "./src/actor/heuristic-actor.ts":
/*!**************************************!*\
  !*** ./src/actor/heuristic-actor.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"HeuristicActor\": () => (/* binding */ HeuristicActor)\n/* harmony export */ });\n/* harmony import */ var _common_priority_queue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/priority-queue */ \"./src/common/priority-queue.ts\");\n/* harmony import */ var _actor_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actor-base */ \"./src/actor/actor-base.ts\");\n\n\nclass HeuristicActor extends _actor_base__WEBPACK_IMPORTED_MODULE_1__.ActorBase {\n    goToGoal() {\n        const bricks = this.world.objects.filter(x => x.stringify !== this.goal.stringify);\n        const visited = new Set();\n        const queue = new _common_priority_queue__WEBPACK_IMPORTED_MODULE_0__.PriorityQueue();\n        queue.enqueue(this.start, 0);\n        while (queue.length > 0) {\n            const current = queue.dequeue();\n            if (current.stringify === this.goal.stringify) {\n                this.visited.push(current);\n                break;\n            }\n            if (visited.has(current.stringify)) {\n                continue;\n            }\n            this.visited.push(current);\n            visited.add(current.stringify);\n            const neighbors = this.getNeighbors(current);\n            for (let neighbor of neighbors) {\n                if (bricks.find(x => x.stringify === neighbor.stringify)) {\n                    continue;\n                }\n                if (visited.has(neighbor.stringify)) {\n                    continue;\n                }\n                if (neighbor.stringify === this.goal.stringify) {\n                    neighbor = this.goal;\n                }\n                const priority = this.getDistance(neighbor, this.goal);\n                queue.enqueue(neighbor, priority);\n                this.mapPath.set(neighbor, current);\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack://demo/./src/actor/heuristic-actor.ts?");

/***/ }),

/***/ "./src/actor/wfs-actor.ts":
/*!********************************!*\
  !*** ./src/actor/wfs-actor.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"WfsActor\": () => (/* binding */ WfsActor)\n/* harmony export */ });\n/* harmony import */ var _common_queue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/queue */ \"./src/common/queue.ts\");\n/* harmony import */ var _actor_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actor-base */ \"./src/actor/actor-base.ts\");\n\n\nclass WfsActor extends _actor_base__WEBPACK_IMPORTED_MODULE_1__.ActorBase {\n    goToGoal() {\n        const bricks = this.world.objects.filter(x => x.stringify !== this.goal.stringify);\n        const visited = new Set();\n        const queue = new _common_queue__WEBPACK_IMPORTED_MODULE_0__.Queue();\n        queue.enqueue(this.start);\n        while (queue.length > 0) {\n            const current = queue.dequeue();\n            if (current.stringify === this.goal.stringify) {\n                this.visited.push(current);\n                break;\n            }\n            if (visited.has(current.stringify)) {\n                continue;\n            }\n            this.visited.push(current);\n            visited.add(current.stringify);\n            const neighbors = this.getNeighbors(current);\n            for (let neighbor of neighbors) {\n                if (bricks.find(x => x.stringify === neighbor.stringify)) {\n                    continue;\n                }\n                if (visited.has(neighbor.stringify)) {\n                    continue;\n                }\n                if (neighbor.stringify === this.goal.stringify) {\n                    neighbor = this.goal;\n                }\n                queue.enqueue(neighbor);\n                this.mapPath.set(neighbor, current);\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack://demo/./src/actor/wfs-actor.ts?");

/***/ }),

/***/ "./src/common/priority-queue.ts":
/*!**************************************!*\
  !*** ./src/common/priority-queue.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PriorityQueue\": () => (/* binding */ PriorityQueue)\n/* harmony export */ });\nclass PriorityQueueItem {\n}\nclass PriorityQueue {\n    constructor() {\n        this.items = [];\n    }\n    get length() {\n        return this.items.length;\n    }\n    enqueue(value, priority) {\n        if (this.items.length === 0) {\n            this.items.push({ priority, item: value });\n            return;\n        }\n        let insertIndex = 0;\n        for (let index = 0; index < this.items.length; index++) {\n            const pointer = this.items[index];\n            insertIndex = index;\n            if (pointer.priority > priority) {\n                this.items.splice(insertIndex, 0, { item: value, priority });\n                return;\n            }\n        }\n        this.items.push({ priority, item: value });\n    }\n    dequeue() {\n        return this.getFirst(true);\n    }\n    peek() {\n        return this.getFirst();\n    }\n    getFirst(deleteIt = false) {\n        if (this.items.length === 0) {\n            return null;\n        }\n        const item = this.items[0];\n        if (deleteIt) {\n            this.items.splice(0, 1);\n        }\n        return item.item;\n    }\n}\n\n\n//# sourceURL=webpack://demo/./src/common/priority-queue.ts?");

/***/ }),

/***/ "./src/common/queue.ts":
/*!*****************************!*\
  !*** ./src/common/queue.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Queue\": () => (/* binding */ Queue)\n/* harmony export */ });\nclass Queue {\n    constructor() {\n        this.items = [];\n    }\n    get length() {\n        return this.items.length;\n    }\n    enqueue(value) {\n        this.items.push(value);\n    }\n    dequeue() {\n        return this.getFirst(true);\n    }\n    peek() {\n        return this.getFirst();\n    }\n    includes(expression) {\n        return !!this.items.find(x => expression(x));\n    }\n    getFirst(deleteIt = false) {\n        if (this.items.length === 0) {\n            return null;\n        }\n        const item = this.items[0];\n        if (deleteIt) {\n            this.items.splice(0, 1);\n        }\n        return item;\n    }\n}\n\n\n//# sourceURL=webpack://demo/./src/common/queue.ts?");

/***/ }),

/***/ "./src/game-infra/position.ts":
/*!************************************!*\
  !*** ./src/game-infra/position.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Position\": () => (/* binding */ Position)\n/* harmony export */ });\nclass Position {\n    constructor(x = 0, y = 0) {\n        this.x = Math.floor(x);\n        this.y = Math.floor(y);\n    }\n    get stringify() {\n        return `${this.x}, ${this.y}`;\n    }\n}\n\n\n//# sourceURL=webpack://demo/./src/game-infra/position.ts?");

/***/ }),

/***/ "./src/game-object/brick.ts":
/*!**********************************!*\
  !*** ./src/game-object/brick.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Brick\": () => (/* binding */ Brick)\n/* harmony export */ });\n/* harmony import */ var _game_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-sprite */ \"./src/game-object/game-sprite.ts\");\n\nclass Brick extends _game_sprite__WEBPACK_IMPORTED_MODULE_0__.GameSprite {\n    constructor(x = 0, y = 0, resolution = 0) {\n        super(x, y);\n        this.resolution = resolution;\n        this.img.src = 'asset/brick.png';\n    }\n    init(worldResolution, used) {\n        this.resolution = worldResolution;\n        this.x = this.getRandomInt(this.context.canvas.width / this.resolution);\n        this.y = this.getRandomInt(this.context.canvas.height / this.resolution);\n        while (used.has(this.stringify)) {\n            this.x = this.getRandomInt(this.context.canvas.width / this.resolution);\n            this.y = this.getRandomInt(this.context.canvas.height / this.resolution);\n        }\n        this.draw();\n    }\n    update() {\n        this.draw();\n    }\n    interact(eventArgs) {\n        console.log('Brick clicked');\n        eventArgs.world.removeSprite(this);\n        eventArgs.handled = true;\n    }\n}\nBrick.createBrickHandler = (eventArgs) => {\n    const brick = new Brick(eventArgs.position.x, eventArgs.position.y, eventArgs.resolution);\n    eventArgs.handled = true;\n    return brick;\n};\n\n\n//# sourceURL=webpack://demo/./src/game-object/brick.ts?");

/***/ }),

/***/ "./src/game-object/game-sprite.ts":
/*!****************************************!*\
  !*** ./src/game-object/game-sprite.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameSprite\": () => (/* binding */ GameSprite)\n/* harmony export */ });\n/* harmony import */ var _game_infra_position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game-infra/position */ \"./src/game-infra/position.ts\");\n\nclass GameSprite extends _game_infra_position__WEBPACK_IMPORTED_MODULE_0__.Position {\n    constructor(x = 0, y = 0) {\n        super(x, y);\n        this.loaded = [];\n        this.img = new Image();\n        this.img.onload = () => {\n            this.loaded.forEach(callBack => {\n                callBack(this);\n            });\n        };\n        this.draw.bind(this);\n    }\n    enable(context) {\n        this.context = context;\n        this.active = true;\n    }\n    draw() {\n        this.context.drawImage(this.img, this.x * this.resolution + 2, this.y * this.resolution + 2);\n    }\n    getRandomInt(max, min = 0) {\n        if (max <= min) {\n            return 0;\n        }\n        return Math.floor(Math.random() * (max - min)) + Math.floor(min);\n    }\n}\n\n\n//# sourceURL=webpack://demo/./src/game-object/game-sprite.ts?");

/***/ }),

/***/ "./src/game-object/goal.ts":
/*!*********************************!*\
  !*** ./src/game-object/goal.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Goal\": () => (/* binding */ Goal)\n/* harmony export */ });\n/* harmony import */ var _game_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-sprite */ \"./src/game-object/game-sprite.ts\");\n\nclass Goal extends _game_sprite__WEBPACK_IMPORTED_MODULE_0__.GameSprite {\n    constructor(x = 0, y = 0) {\n        super(x, y);\n        this.img.src = 'asset/goal.png';\n    }\n    init(worldResolution, used) {\n        this.resolution = worldResolution;\n        this.x = this.getRandomInt(this.context.canvas.width / this.resolution, this.context.canvas.width / this.resolution / 2);\n        this.y = this.getRandomInt(this.context.canvas.height / this.resolution, this.context.canvas.height / this.resolution / 2);\n        while (used.has(this.stringify)) {\n            this.x = this.getRandomInt(this.context.canvas.width / this.resolution, this.context.canvas.width / this.resolution / 2);\n            this.y = this.getRandomInt(this.context.canvas.height / this.resolution, this.context.canvas.height / this.resolution / 2);\n        }\n        this.draw();\n    }\n    update() {\n        this.draw();\n    }\n    interact(eventArgs) {\n        console.log('Goal clicked');\n        eventArgs.handled = true;\n    }\n}\n\n\n//# sourceURL=webpack://demo/./src/game-object/goal.ts?");

/***/ }),

/***/ "./src/game-object/start.ts":
/*!**********************************!*\
  !*** ./src/game-object/start.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Start\": () => (/* binding */ Start)\n/* harmony export */ });\n/* harmony import */ var _game_sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-sprite */ \"./src/game-object/game-sprite.ts\");\n\nclass Start extends _game_sprite__WEBPACK_IMPORTED_MODULE_0__.GameSprite {\n    constructor(x = 0, y = 0) {\n        super(x, y);\n        this.img.src = 'asset/start.png';\n    }\n    init(worldSize) {\n        this.resolution = worldSize;\n        this.draw();\n    }\n    update() {\n        this.draw();\n    }\n    interact(eventArgs) {\n        eventArgs.handled = true;\n    }\n}\n\n\n//# sourceURL=webpack://demo/./src/game-object/start.ts?");

/***/ }),

/***/ "./src/game-system.ts":
/*!****************************!*\
  !*** ./src/game-system.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameSystem\": () => (/* binding */ GameSystem)\n/* harmony export */ });\n/* harmony import */ var _game_infra_position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-infra/position */ \"./src/game-infra/position.ts\");\n\nclass GameSystem {\n    constructor(canvas, resolution = 25) {\n        this.sprites = [];\n        this.worldResolution = 25;\n        this.interactHandler = [];\n        this.canvas = canvas;\n        this.context = this.canvas.getContext('2d');\n        this.worldResolution = resolution;\n        this.canvas.onclick = this.onClick.bind(this);\n        this.update = this.update.bind(this);\n        this.removeSprite = this.removeSprite.bind(this);\n        this.drawSprite = this.drawSprite.bind(this);\n        this.boundValue = new _game_infra_position__WEBPACK_IMPORTED_MODULE_0__.Position(Math.floor(this.canvas.width / resolution), Math.floor(this.canvas.height / resolution));\n    }\n    get objects() {\n        return this.sprites;\n    }\n    get bound() {\n        return this.boundValue;\n    }\n    renderWorld(worldContext) {\n        for (let indexX = 1; indexX < this.canvas.width; indexX += this.worldResolution) {\n            worldContext.beginPath();\n            worldContext.moveTo(indexX, 0);\n            worldContext.lineTo(indexX, this.canvas.height);\n            worldContext.stroke();\n        }\n        for (let indexY = 1; indexY < this.canvas.height; indexY += this.worldResolution) {\n            worldContext.beginPath();\n            worldContext.moveTo(0, indexY);\n            worldContext.lineTo(this.canvas.width, indexY);\n            worldContext.stroke();\n        }\n    }\n    renderPath(pathContext, path) {\n        let pre = null;\n        for (let index = 0; index < path.length; index++) {\n            const node = path[index];\n            const nodeLocation = new _game_infra_position__WEBPACK_IMPORTED_MODULE_0__.Position((node.x + 0.5) * this.worldResolution + 1, (node.y + 0.5) * this.worldResolution + 1);\n            if (pre !== null) {\n                const preLocation = new _game_infra_position__WEBPACK_IMPORTED_MODULE_0__.Position((pre.x + 0.5) * this.worldResolution + 1, (pre.y + 0.5) * this.worldResolution + 1);\n                pathContext.beginPath();\n                pathContext.moveTo(preLocation.x, preLocation.y);\n                pathContext.lineTo(nodeLocation.x, nodeLocation.y);\n                pathContext.stroke();\n            }\n            pathContext.beginPath();\n            pathContext.ellipse(nodeLocation.x, nodeLocation.y, 2, 2, Math.PI / 4, 0, 2 * Math.PI);\n            pathContext.stroke();\n            pre = node;\n        }\n    }\n    renderVisited(pathContext, visited) {\n        pathContext.fillStyle = '#E1A679';\n        for (const node of visited) {\n            pathContext.fillRect(node.x * this.worldResolution + 2, node.y * this.worldResolution + 2, this.worldResolution - 2, this.worldResolution - 2);\n        }\n        pathContext.fillStyle = 'black';\n    }\n    activeSprite(sprite) {\n        sprite.enable(this.context);\n        this.sprites.push(sprite);\n    }\n    removeSprite(sprite) {\n        const index = this.sprites.indexOf(sprite);\n        this.sprites.splice(index, 1);\n    }\n    start(interval = 100) {\n        const set = new Set();\n        for (const sprite of this.sprites.filter(x => x.active)) {\n            sprite.init(this.worldResolution, set);\n            set.add(sprite.stringify);\n        }\n        const timeOut = setTimeout(() => {\n            this.update();\n            clearTimeout(timeOut);\n        }, 100);\n        this.frameRunner = setInterval(this.update, interval);\n    }\n    update() {\n        this.clear();\n        for (const sprite of this.sprites.filter(x => x.active)) {\n            sprite.update();\n        }\n    }\n    stop() {\n        clearInterval(this.frameRunner);\n        this.clear();\n    }\n    clear() {\n        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    }\n    registerInteract(handler) {\n        this.interactHandler.push(handler);\n    }\n    onClick(event) {\n        const eventArgs = this.getInteractArgs(event);\n        for (const sprite of this.sprites) {\n            if (event.offsetX >= sprite.x * sprite.resolution &&\n                event.offsetX <= (sprite.x + 1) * sprite.resolution &&\n                event.offsetY >= sprite.y * sprite.resolution &&\n                event.offsetY <= (sprite.y + 1) * sprite.resolution) {\n                sprite.interact(eventArgs);\n            }\n        }\n        for (const handler of this.interactHandler) {\n            if (eventArgs.handled) {\n                break;\n            }\n            const sprite = handler(eventArgs);\n            if (sprite) {\n                this.activeSprite(sprite);\n            }\n        }\n    }\n    getInteractArgs(event) {\n        return {\n            position: new _game_infra_position__WEBPACK_IMPORTED_MODULE_0__.Position(event.offsetX / this.worldResolution, event.offsetY / this.worldResolution),\n            handled: false,\n            world: this,\n            resolution: this.worldResolution,\n        };\n    }\n    drawSprite(sprite) {\n        sprite.draw();\n        const index = sprite.loaded.indexOf(this.drawSprite);\n        sprite.loaded.splice(index, 1);\n    }\n}\n\n\n//# sourceURL=webpack://demo/./src/game-system.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"resetWorld\": () => (/* binding */ resetWorld),\n/* harmony export */   \"specialWorld\": () => (/* binding */ specialWorld),\n/* harmony export */   \"wfsAction\": () => (/* binding */ wfsAction),\n/* harmony export */   \"heuristicAction\": () => (/* binding */ heuristicAction),\n/* harmony export */   \"aStarAction\": () => (/* binding */ aStarAction)\n/* harmony export */ });\n/* harmony import */ var _actor_a_star_actor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actor/a-star-actor */ \"./src/actor/a-star-actor.ts\");\n/* harmony import */ var _actor_heuristic_actor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actor/heuristic-actor */ \"./src/actor/heuristic-actor.ts\");\n/* harmony import */ var _actor_wfs_actor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actor/wfs-actor */ \"./src/actor/wfs-actor.ts\");\n/* harmony import */ var _game_object_brick__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game-object/brick */ \"./src/game-object/brick.ts\");\n/* harmony import */ var _game_object_goal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game-object/goal */ \"./src/game-object/goal.ts\");\n/* harmony import */ var _game_object_start__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game-object/start */ \"./src/game-object/start.ts\");\n/* harmony import */ var _game_system__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./game-system */ \"./src/game-system.ts\");\n\n\n\n\n\n\n\nconst world = document.querySelector('#world');\nconst foreground = document.querySelector('#curtain');\nconst path = document.querySelector('#path');\nlet system;\nlet goal;\nlet start;\nfunction resetWorld(resolution) {\n    world.getContext('2d').clearRect(0, 0, world.width, world.height);\n    path.getContext('2d').clearRect(0, 0, path.width, path.height);\n    system === null || system === void 0 ? void 0 : system.stop();\n    system = new _game_system__WEBPACK_IMPORTED_MODULE_6__.GameSystem(foreground, +resolution);\n    system.registerInteract(_game_object_brick__WEBPACK_IMPORTED_MODULE_3__.Brick.createBrickHandler);\n    system.renderWorld(world.getContext('2d'));\n    start = new _game_object_start__WEBPACK_IMPORTED_MODULE_5__.Start();\n    system.activeSprite(start);\n    goal = new _game_object_goal__WEBPACK_IMPORTED_MODULE_4__.Goal();\n    system.activeSprite(goal);\n    for (let index = 0; index < 200 / +resolution; index++) {\n        const brick = new _game_object_brick__WEBPACK_IMPORTED_MODULE_3__.Brick();\n        system.activeSprite(brick);\n    }\n    system.start();\n}\nfunction specialWorld() {\n    world.getContext('2d').clearRect(0, 0, world.width, world.height);\n    path.getContext('2d').clearRect(0, 0, path.width, path.height);\n    system === null || system === void 0 ? void 0 : system.stop();\n}\nfunction goToGoal(create) {\n    path.getContext('2d').clearRect(0, 0, path.width, path.height);\n    const actor = create(system, start, goal);\n    actor.goToGoal();\n    system.renderVisited(path.getContext('2d'), actor.visited);\n    system.renderPath(path.getContext('2d'), actor.pathToPrint);\n}\nfunction wfsAction() {\n    goToGoal((game, start, goal) => new _actor_wfs_actor__WEBPACK_IMPORTED_MODULE_2__.WfsActor(game, start, goal));\n}\nfunction heuristicAction() {\n    goToGoal((game, start, goal) => new _actor_heuristic_actor__WEBPACK_IMPORTED_MODULE_1__.HeuristicActor(game, start, goal));\n}\nfunction aStarAction() {\n    goToGoal((game, start, goal) => new _actor_a_star_actor__WEBPACK_IMPORTED_MODULE_0__.AStarActor(game, start, goal));\n}\nconst resolution = document.querySelector('input');\nconst resetButton = document.querySelector('#reset');\nresetButton.addEventListener('click', () => resetWorld(resolution.value));\nconst wfsButton = document.querySelector('#wfs');\nwfsButton.addEventListener('click', () => wfsAction());\nconst heuristicButton = document.querySelector('#heuristic');\nheuristicButton.addEventListener('click', () => heuristicAction());\nconst aStarButton = document.querySelector('#a-star');\naStarButton.addEventListener('click', () => aStarAction());\n// window['resetWorld'] = resetWorld;\n// window['wfsAction'] = wfsAction;\n// window['heuristicAction'] = heuristicAction;\n// window['aStarAction'] = aStarAction;\n\n\n//# sourceURL=webpack://demo/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;