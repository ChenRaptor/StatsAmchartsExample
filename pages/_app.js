import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
        <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
        <script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
        <script src="https://cdn.amcharts.com/lib/5/percent.js"></script>
        <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
        <script src="//cdn.amcharts.com/lib/5/plugins/sliceGrouper.js"></script>
        <Component {...pageProps} />
    </div>
  )
}

export default MyApp
