class Handler {
    constructor(request, h) {
        this.request = request;
        this.h = h;
        this.result = null;
    }

    async makeResult() {
        //override this    
    }

    async getResult() {
        await this.makeResult();
        return {
            success: true,
            data: this.result
        }
    }
}

module.exports = Handler;