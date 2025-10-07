front-end
cd frontend
npm start


back-end
cd backend
source venv/bin/activate
python3 ./app.py


gdal_translate curvatureclassified.tif output_cog.tif -of COG

gdalwarp -t_srs EPSG:4326 aspect.tif output.tif