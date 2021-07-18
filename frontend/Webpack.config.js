
const path=require('path')


const configureWebpack= {
    module: {
        rules: [
            {
                test: /Map/,
                loader: 'null-loader', // also tried 'dumb-loader'
                exclude: [
                    path.resolve(__dirname, 'src/components/Map.jsx'),
                  ], // this seems to exclude the file from the bundle
            },
        ],
    },
}


module.exports=configureWebpack