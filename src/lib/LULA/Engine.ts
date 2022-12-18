import Lula from './Lula';

/**
 * The Engine class is the base class for all LULA engines.
 * It provides the basic functionality of a LULA engine.
 * It is an abstract class and has to be extended by a concrete engine.
 */

abstract class Engine {
    private _lula: Lula | null;
    constructor() {
        this._lula = null;
    }

    _init(canvas: HTMLCanvasElement) {
        this._lula = new Lula(canvas);
        this.init();
    }

    _run() {

        // resize the canvas to fill browser window dynamically
        this.lula.resize();

        // tell it to use our program (pair of shaders)
        this.lula.useProgram();

        // Clear the canvas
        this.lula.clear();

        // Run the program
        this.run();
    }

    // getter of lula
    get lula(): Lula {
        if (this._lula) {
            return this._lula;
        } else {
            throw new Error('Lula is not initialized (a Canvas has to be initialized)');
        }
    }


    abstract init(): void

    abstract run(): void

}

export default Engine