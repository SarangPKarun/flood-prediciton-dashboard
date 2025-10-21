front-end
cd frontend
npm start


back-end
cd backend
source venv/bin/activate
python3 ./app.py


gdal_translate curvatureclassified.tif output_cog.tif -of COG

gdalwarp -t_srs EPSG:4326 aspect.tif output.tif



# 1️⃣ Reproject to EPSG:4326 and resample to 180m
gdalwarp -t_srs EPSG:4326 -tr 0.0016 0.0016 -r bilinear input.tif temp_4326.tif

# 2️⃣ Convert to COG (optimized for Leaflet)
gdal_translate temp_4326.tif output_cog.tif -of COG \
  -co COMPRESS=LZW -co BIGTIFF=YES -co NUM_THREADS=ALL_CPUS

# for distancetostream. to do first
gdal_calc.py -A distancetostream90.tif \
  --outfile=diststream_fixed.tif \
  --calc="A*(A<1e10)" \
  --NoDataValue=-9999 \
  --overwrite