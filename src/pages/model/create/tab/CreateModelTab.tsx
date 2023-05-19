import React, {useEffect, useState} from 'react';
import {tabsData} from "../../../../assets/Dummy";
import {Link, useNavigate} from "react-router-dom";
import {useDropzone} from "react-dropzone";
import Header from "../../../../components/layout/Header";
import {PlatformAPI} from "../../../../platform/PlatformAPI";
import {RegionEntityData} from "../../../../types/chameleon-platform.common";
import {FileUtils} from "../../../../utils/FileUtils";

type IFile = File & { preview?: string };

export default function CreateModelTab({ activeTabIndex }: { activeTabIndex: number }) {
	const navigate = useNavigate();
	const [hideDrop, setHideDrop] = useState<boolean>(false);
	const [files, setFiles] = useState<IFile[]>([]);
	const [modelName, setModelName] = useState<string>('');
	const [inputType, setInputType] = useState<string>('none');
	const [outputType, setOutputType] = useState<string>('image');
	const [regionName, setRegionName] = useState<string>('');
	const [regions, setRegions] = useState<RegionEntityData[]>([]);
	const [category, setCategory] = useState<string>('');
	const [price, setPrice] = useState<number>();

	const handleModelNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setModelName(event.target.value);
	};
	const handleInputTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setInputType(event.target.value);
	};
	const handleOutputTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setOutputType(event.target.value);
	};
	const handleRegionNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setRegionName(event.target.value);
	};
	const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCategory(event.target.value);
	};
	const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPrice(Number(event.target.value));
	};

	const handleClick = () => {
		navigate("/models/create/description", {
			state: { files, modelName, inputType, outputType, regionName, category, price, activeTabIndex }
		});
	};

	useEffect(() => {
		let completed = false;

		(async function get() {
			try {
				const regions = await PlatformAPI.getRegions();
				if (!completed) {
					setRegions(regions);
					setRegionName(regions?.[0]?.name);
				}
			} catch (error) {
				console.error(error);
			}
		})();

		return () => {
			completed = true;
		};
	}, []);

	const {getRootProps, getInputProps} = useDropzone({
		accept: activeTabIndex === 0 ? {
			'application/x-tar': []
		} : undefined,
		onDrop: acceptedFiles => {
			setHideDrop(true);
			setFiles(acceptedFiles.map(file => Object.assign(file, {
				preview: URL.createObjectURL(file)
			})));
		}
	});

	const acceptedFileItems = files.map(file => (
		<li key={file.name}>
			{file.name} - {FileUtils.formatBytes(file.size)}
		</li>
	));

	useEffect(() => {
		return () => files.forEach(file => URL.revokeObjectURL(file.preview as string));
	}, [files]);

	const removeFile = () => {
		setFiles([]);
		setHideDrop(false);
	}

	return (
		<div className="py-4">
			<div className="flex justify-between items-center">
				<div className="flex items-end">
					<Header title="Model Info"/>
					<h1 className="mx-2 text-gray-500">{tabsData[activeTabIndex].label}</h1>
				</div>
				<div className="flex gap-3 float-right">
					<Link to="/models/my"><button className="white-btn w-16 p-2">back</button></Link>
					<button onClick={handleClick} className="submit-btn w-16">next</button>
				</div>
			</div>
			<div className="gap-4 grid md:pt-10 md:px-5 md:my-2 md:grid-cols-2">
				<div>
					<div className="md:mt-0 mt-5 mb-3">
						<h1 className="md:py-5 text-xl font-bold">Model Name</h1>
						<input
							type="text"
							className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
							id="model-name"
							placeholder="Model Name"
							value={modelName}
							onChange={handleModelNameChange}/>
					</div>
					<div className="mb-3">
						<h1 className="md:py-5 text-xl font-bold">Input Type</h1>
						<select id="Input"
						        className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
						        value={inputType}
						        onChange={handleInputTypeChange}>
							<option value="none">(none)</option>
							<option value="image">image</option>
							<option value="binary">binary</option>
							<option value="text">text</option>
						</select>
					</div>
					<div className="mb-3">
						<h1 className="md:py-5 text-xl font-bold">Output Type</h1>
						<select id="Output"
						        className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
						        value={outputType}
						        onChange={handleOutputTypeChange}>
							<option value="image">image</option>
							<option value="binary">binary</option>
							<option value="text">text</option>
						</select>
					</div>
					<div className="mb-3">
						<h1 className="md:py-5 text-xl font-bold">Model Region</h1>
						<select id="countries"
						        className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
						        value={regionName}
						        onChange={handleRegionNameChange}>
							{regions.map((region: { id: number; name: string; }) => (
								<option key={region.id} value={region.name}>{region.name}</option>
							))}
						</select>
					</div>
				</div>
				<div>
					<div className="mb-3">
						<h1 className="md:py-5 text-xl font-bold">Category (Option)</h1>
						<input
							type="text"
							className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
							id="category"
							placeholder="Category"
							value={category}
							onChange={handleCategoryChange}/>
					</div>
					<div className="mb-3">
						<h1 className="md:py-5 text-xl font-bold">Price (Option)</h1>
						<input
							type="number"
							min="0"
							className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
							id="price"
							placeholder="Price"
							value={price}
							onChange={handlePriceChange}/>
					</div>
					<div className="mb-3">
						<h1 className="md:py-5 text-xl font-bold">File Upload</h1>
						<div className="py-2 rounded border border-solid border-gray-300 text-center item-center">
							<img style={activeTabIndex === 0 ? {width: '60px', height: '70px'} : {width: '56px', height: '70px'}} alt="img"
							     className="object-cover w-full inline-block align-middle" src={tabsData[activeTabIndex].img}/>
							<section className="container h-full">
								<div {...getRootProps()}
								     className={hideDrop ? "hidden" : "dropzone cursor-pointer"}>
									<input {...getInputProps()} />
									<p className="inline-block px-1 text-gray-500 hover:text-gray-700">
										Drag & drop a {tabsData[activeTabIndex].label} here, or click to select a {tabsData[activeTabIndex].label}</p>
								</div>
								<ul className={hideDrop ? "px-5 pb-5 pt-2" : "hidden"}>{acceptedFileItems}</ul>
								<div className="pt-2 pr-3">
									<button onClick={removeFile}
									        className="submit-btn float-right text-sm py-1 px-1.5 border border-gray border-solid rounded-md hover:border-black">remove
									</button>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};