const imageProxy = async (req : any, res : any) => {
  const url = decodeURIComponent(req.query.url);
  const result = await fetch(url);
  const body : any = await result.body;
  body.pipe(res);
};
export default imageProxy;